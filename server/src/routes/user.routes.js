const Router = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const authMiddleware = require('../middleware/auth.middleware')

const User = require('../models/User')
const List = require('../models/List')
const Task = require('../models/Task')

const router = new Router()

const jwtSecretKey = process.env.JWT_SECRET_KEY

router.post(
	'/signup',
	[
		check('email', 'Uncorrect email').isEmail(),
		check(
			'password',
			'Password must be longer than 3 and shorter than 12'
		).isLength({ min: 3, max: 12 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}
			const { email, password } = req.body
			const candidateEmail = await User.findOne({ email })
			if (candidateEmail) {
				return res
					.status(400)
					.json({ message: `User with email ${email} alredy exsist` })
			}
			const nameMatch = email.match(/^([^@]*)@/)
			const username = nameMatch ? nameMatch[1] : null

			const candidateUsername = await User.findOne({ username })
			if (candidateUsername) {
				return res
					.status(400)
					.json({ message: `User with username ${username} alredy exsist` })
			}
			const hashPassword = await bcrypt.hash(password, 4)
			const user = new User({ email, password: hashPassword, username })
			await user.save()

			// find user
			const userFind = await User.findOne({ email })
			const token = jwt.sign({ id: userFind.id }, jwtSecretKey, {
				expiresIn: '48h',
			})

			// response
			const response = {
				userId: userFind.id,
				email: userFind.email,
				username: userFind.username,
				token,
			}
			return res.json({
				user: response,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (registration)' })
		}
	}
)

router.post(
	'/login',
	[
		check('email', 'Uncorrect email').isEmail(),
		check('password', 'Uncorrect username').isLength({ min: 1 }),
	],
	async (req, res) => {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ email })
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const isPassValid = bcrypt.compareSync(password, user.password)
			if (!isPassValid) {
				return res.status(400).json({ message: 'Invalid password' })
			}
			const token = jwt.sign({ id: user.id }, jwtSecretKey, {
				expiresIn: '48h',
			})

			const responseUser = {
				userId: user.id,
				email: user.email,
				username: user.username,
				token,
			}
			// find all user lists
			const responseLists = []
			for (let i = 0; i < user.listId.length; i++) {
				const list = await List.findById(
					mongoose.Types.ObjectId(user.listId[i])
				)
				if (!list) {
					continue
				}
				if (list.userId !== user.id) {
					break
				} else {
					responseLists.push(list)
				}
			}
			// find all user tasks
			let responseTasks = []
			for (let i = 0; i < user.listId.length; i++) {
				const list = await List.findOne({
					_id: mongoose.Types.ObjectId(user.listId[i]),
				})
				if (!list) {
					continue
				}
				let listTasks = list.tasksId
				if (!listTasks) {
					continue
				}
				for (let j = 0; j < listTasks.length; j++) {
					const task = await Task.findById(
						mongoose.Types.ObjectId(listTasks[j])
					)
					if (!task) {
						continue
					}
					responseTasks.push(task)
				}
			}
			return res.json({
				user: responseUser,
				lists: responseLists,
				tasks: responseTasks,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (login)' })
		}
	}
)

router.get('/auth', authMiddleware, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.id })
		const token = jwt.sign({ id: user.id }, jwtSecretKey, {
			expiresIn: '48h',
		})
		const responseUser = {
			userId: user.id,
			email: user.email,
			username: user.username,
			token,
		}
		// find all user lists
		const responseLists = []
		for (let i = 0; i < user.listId.length; i++) {
			const list = await List.findById(mongoose.Types.ObjectId(user.listId[i]))
			if (!list) {
				continue
			}
			if (list.userId !== user.id) {
				break
			} else {
				responseLists.push(list)
			}
		}
		// find all user tasks
		let responseTasks = []
		for (let i = 0; i < user.listId.length; i++) {
			const list = await List.findOne({
				_id: mongoose.Types.ObjectId(user.listId[i]),
			})
			if (!list) {
				continue
			}
			let listTasks = list.tasksId
			if (!listTasks) {
				continue
			}
			for (let j = 0; j < listTasks.length; j++) {
				const task = await Task.findById(mongoose.Types.ObjectId(listTasks[j]))
				if (!task) {
					continue
				}
				responseTasks.push(task)
			}
		}
		return res.json({
			user: responseUser,
			lists: responseLists,
			tasks: responseTasks,
		})
	} catch (e) {
		console.log(e)
		res.send({ message: 'Server error (auth)' })
	}
})

module.exports = router
