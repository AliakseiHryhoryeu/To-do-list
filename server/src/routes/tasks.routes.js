const Router = require('express')
const { check, validationResult } = require('express-validator')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

const User = require('../models/User')
const List = require('../models/List')
const Task = require('../models/Task')

const router = new Router()

const jwtSecretKey = process.env.JWT_SECRET_KEY

router.get('/tasksbyusertoken', async function (req, res) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ message: 'Uncorrect request', errors })
		}

		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(401).json({ message: 'Auth error' })
		}
		const decoded = jwt.verify(token, jwtSecretKey)
		req.user = decoded
		const userId = req.user.id

		const user = await User.findById(mongoose.Types.ObjectId(userId))
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const userLists = user.listId
		let response = []
		for (let i = 0; i < userLists.length; i++) {
			const list = await List.findOne({
				_id: mongoose.Types.ObjectId(userLists[i]),
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
				response.push(task)
			}
		}
		return res.json({
			tasks: response,
		})
	} catch (e) {
		console.log(e)
		res.send({ message: 'Server error (get tasks by user id)' })
	}
})

router.get(
	'/tasksbylistid',
	[check('listId', 'Uncorrect list id').isLength({ min: 1 })],
	async function (req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}

			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Auth error' })
			}
			const decoded = jwt.verify(token, jwtSecretKey)
			req.user = decoded
			const userId = req.user.id

			const user = await User.findById(userId)
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const { listId } = req.query
			const list = await List.findById(mongoose.Types.ObjectId(listId))
			if (!list) {
				return res.status(404).json({ message: 'List not found' })
			}
			const response = []

			for (let i = 0; i < list.tasksId.length; i++) {
				const task = await Task.findById(
					mongoose.Types.ObjectId(list.tasksId[i])
				)
				if (!task) {
					continue
				}
				response.push(task)
			}

			return res.json({
				tasks: response,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (get tasks by list id)' })
		}
	}
)

router.get(
	'/task',
	[check('taskId', 'Uncorrect taskId').isLength({ min: 1 })],
	async function (req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}

			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Auth error' })
			}
			const decoded = jwt.verify(token, jwtSecretKey)
			req.user = decoded
			const userId = req.user.id

			const user = await User.findById(userId)
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const { taskId } = req.query
			const task = await Task.findById(mongoose.Types.ObjectId(taskId))
			if (!task) {
				return res.status(404).json({ message: 'Task not found' })
			}

			const response = {
				_id: task.id,
				text: task.text,
				completed: task.completed,
				listId: task.listId,
				userId: task.userId,
			}
			return res.json({
				task: response,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (get task)' })
		}
	}
)

router.post(
	'/createtask',
	[
		check('text', 'Uncorrect text').isLength({ min: 1 }),
		check('listId', 'Uncorrect listId').isLength({ min: 1 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}

			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Auth error' })
			}
			const decoded = jwt.verify(token, jwtSecretKey)
			req.user = decoded
			const userId = req.user.id

			const user = await User.findById(userId)
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const { listId, text } = req.body

			const list = await List.findById(mongoose.Types.ObjectId(listId))
			if (!list) {
				return res.status(404).json({ message: 'List not found', errors })
			}

			const task = new Task({
				text: text,
				listId: mongoose.Types.ObjectId(listId),
				userId: mongoose.Types.ObjectId(userId),
			})
			list.tasksId.push(task._id)
			await task.save()
			await list.save()

			const response = {
				_id: task.id,
				text: task.text,
				completed: task.completed,
				listId: task.listId,
				userId: task.userId,
			}
			return res.json({
				task: response,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (add task)' })
		}
	}
)

//Edit task router
router.put(
	'/updatetask',
	[
		check('taskId', 'Uncorrect taskId').isLength({ min: 1 }),
		check('text', 'Uncorrect text').isLength({ min: 1 }),
		check('completed', 'Uncorrect text').isLength({ min: 1 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}

			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Auth error' })
			}
			const decoded = jwt.verify(token, jwtSecretKey)
			req.user = decoded
			const userId = req.user.id

			const user = await User.findById(userId)
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const { taskId, text, completed } = req.body

			const task = await Task.findById(mongoose.Types.ObjectId(taskId))
			if (!task) {
				return res.status(404).json({ message: 'Task not found' })
			}

			task.text = text
			task.completed = completed
			await task.save()
			const response = {
				_id: taskId,
				text: task.text,
				completed: task.completed,
				listId: task.listId,
				userId: task.userId,
			}
			return res.json({
				task: response,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (edit task)' })
		}
	}
)

//Delete task
router.put(
	'/deletetask',
	[check('taskId', 'Uncorrect taskId').isLength({ min: 1 })],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Uncorrect request', errors })
			}

			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return res.status(401).json({ message: 'Auth error' })
			}
			const decoded = jwt.verify(token, jwtSecretKey)
			req.user = decoded
			const userId = req.user.id

			const user = await User.findById(userId)
			if (!user) {
				return res.status(404).json({ message: 'User not found' })
			}

			const { taskId } = req.body

			const task = await Task.findById(mongoose.Types.ObjectId(taskId))
			if (!task) {
				return res.status(404).json({ message: 'Task not found' })
			}

			const listId = task.listId
			const list = await List.findByIdAndUpdate(
				{ _id: listId },
				{ $pull: { tasksId: mongoose.Types.ObjectId(taskId) } }
			)
			await task.save()
			await list.save()
			const temp = await Task.findByIdAndDelete(mongoose.Types.ObjectId(taskId))

			// Find all tasks
			const userLists = user.listId
			let response = []
			for (let i = 0; i < userLists.length; i++) {
				const list = await List.findOne({
					_id: mongoose.Types.ObjectId(userLists[i]),
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
					response.push(task)
				}
			}

			return res.json({
				tasks: response,
			})
		} catch (e) {
			console.log(e)
			res.send({ message: 'Server error (delete task)' })
		}
	}
)

module.exports = router
