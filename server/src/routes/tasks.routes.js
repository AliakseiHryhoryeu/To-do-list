const Router = require("express")
const { check, validationResult } = require("express-validator")
const List = require("../models/List")
const Task = require("../models/Task")

const router = new Router()



// Get Tasks router
router.get('/getTasks',
    [
        check('id', "Uncorrect list id").isLength({ min: 1 }),
    ],
    async function (req, res) {
        try {
            const { id } = req.body
            const list = await List.findOne({ id: id })
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
            res.send({ message: "Server error" })
        }
    })


// Add Task router
router.post('/addTask',
    [
        check('listId', "Uncorrect listId").isLength({ min: 1 }),
        check('text', "Uncorrect text").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { listId, text } = req.body

            const list = await List.findOne({ id: listId })
            const task = new Task({ text: text, listId: listId })
            list.tasksId.push(task.id)
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
            res.send({ message: "Server error" })
        }
    })




//Edit task router
router.put('/editTask',
    [
        check('id', "Uncorrect taskId").isLength({ min: 1 }),
        check('text', "Uncorrect text").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { id, text, completed } = req.body

            const task = await Task.findOne({ id: id })
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
            res.send({ message: "Server error" })
        }
    })

//Delete task
router.put('/deleteTask',
    [
        check('id', "Uncorrect taskId").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { id } = req.body

            const task = await Task.findOne({ id: id })
            const listId = task.listId
            const list = await List.findOneAndUpdate(
                { listId },
                { $pull: { tasksId: { $in: [id] } } }
            )


            await task.save()
            await list.save()
            const response = await List.findOne({listId})
            return res.json({
                response
            })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })

module.exports = router