const Router = require("express")
const { check, validationResult } = require("express-validator")
const mongoose = require("mongoose")
const User = require("../models/User")
const List = require("../models/List")
const Task = require("../models/Task")

const router = new Router()

router.get('/getTasksByUserId',
    [
        check('userId', "Uncorrect user id").isLength({ min: 1 }),
    ],
    async function (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { userId } = req.body
            const user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            const userLists = user.listId
            let userTasks = [null]
            for (let i = 0; i < userLists.length; i++) {
                const list = await List.findOne({ _id: mongoose.Types.ObjectId(userLists[i]) })
                if (!list) {
                    continue
                }
                let listTasks = [null]
                listTasks = List.tasksId
                if (!listTasks) {
                    continue
                }
                for (let j = 0; j < listTasks.length; j++) {
                    const task = await Task.findOne({ _id: mongoose.Types.ObjectId(listTasks[j]) })
                    if (!task) {
                        continue
                    }
                    userTasks += Task
                }

            }
            return res.json({
                userTasks
            })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error (get tasks by user id)" })
        }
    })

router.get('/getTasksByListId',
    [
        check('listId', "Uncorrect list id").isLength({ min: 1 }),
    ],
    async function (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { listId } = req.body
            const list = await List.findOne({ _id: mongoose.Types.ObjectId(listId) })
            if (!list) {
                return res.status(404).json({ message: "List not found" })
            }
            const tasksList = list.tasksId
            const tasks = await Task.find({ tasksList })
            return res.json({
                tasks
            })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error (get tasks by list id)" })
        }
    })
router.get('/getTask',
    [
        check('taskId', "Uncorrect listId").isLength({ min: 1 })
    ],
    async function (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { taskId } = req.body
            const task = await Task.findOne({ _id: mongoose.Types.ObjectId(taskId) })
            if (!task) {
                return res.status(404).json({ message: "Task not found" })
            }

            return res.json({
                list
            })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error (get task)" })
        }
    })


router.post('/addTask',
    [
        check('listId', "Uncorrect listId").isLength({ min: 1 }),
        check('userId', "Uncorrect userId").isLength({ min: 1 }),
        check('text', "Uncorrect text").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { listId, userId, text } = req.body

            const list = await List.findOne({ _id: mongoose.Types.ObjectId(listId) })
            if (!list) {
                return res.status(404).json({ message: "List not found", errors })
            }
            const user = await List.findOne({ _id: mongoose.Types.ObjectId(userId) })
            if (!user) {
                return res.status(404).json({ message: "User not found", errors })
            }
            const task = new Task({ text: text, listId: mongoose.Types.ObjectId(listId), userId: mongoose.Types.ObjectId(userId) })
            list.tasksId.push(task._id)
            await task.save()
            await list.save()
            return res.json({
                task: {
                    text: text,
                    listId: listId,
                    completed: false
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error (add task)" })
        }
    })




//Edit task router
router.put('/editTask',
    [
        check('taskId', "Uncorrect taskId").isLength({ min: 1 }),
        check('text', "Uncorrect text").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { taskId, text, completed } = req.body

            const task = await Task.findOne({ _id: mongoose.Types.ObjectId(taskId) })
            if (!task) {
                return res.status(404).json({ message: "Task not found" })
            }

            task.text = text
            task.completed = completed
            await task.save()
            return res.json({
                task: {
                    text: text,
                    completed: completed
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error (edit task)" })
        }
    })

//Delete task
router.put('/deleteTask',
    [
        check('taskId', "Uncorrect taskId").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { taskId } = req.body

            const task = await Task.findOne({ _id: mongoose.Types.ObjectId(taskId) })
            if (!task) {
                return res.status(404).json({ message: "Task not found" })

            }
            const listId = task.listId
            const list = await List.findOneAndUpdate(
                { listId },
                { $pull: { tasksId: { $in: [taskId] } } }
            )

            await task.save()
            await list.save()
            const response = await List.findOne({ _id: mongoose.Types.ObjectId(listId) })
            return res.json({
                response
            })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error (delete task)" })
        }
    })

module.exports = router