const Router = require('express')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config.json')
const authMiddleware = require('../middleware/auth.middleware')

const router = new Router()

router.post(
	'/signup',
	[
		check('email', 'Uncorrect email').isEmail(),
		check('username', 'Uncorrect username').isLength({ min: 1 }),
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
			const token = jwt.sign({ id: userFind.id }, config.secretKey, {
				expiresIn: '48h',
			})
			return res.json({
				userId: userFind.id,
				email: userFind.email,
				username: userFind.username,
				token,
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
			const token = jwt.sign({ id: user.id }, config.secretKey, {
				expiresIn: '48h',
			})
			return res.json({
				userId: user.id,
				email: user.email,
				username: user.username,
				token,
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
		const token = jwt.sign({ id: user.id }, config.secretKey, {
			expiresIn: '48h',
		})
		return res.json({
			userId: user.id,
			email: user.email,
			username: user.username,
			token,
		})
	} catch (e) {
		console.log(e)
		res.send({ message: 'Server error (auth)' })
	}
})

module.exports = router
