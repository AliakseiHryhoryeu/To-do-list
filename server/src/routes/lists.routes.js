const Router = require("express")
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
const List = require("../models/List")
const Task = require("../models/Task")

const router = new Router()



//Get lists router
router.get('/getLists', async function (req, res) {
    try {
        const { userId } = req.body

        const user = await User.findOne({ id:userId })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const userLists = user.listId
        const lists = await List.find({ userLists })

        return res.json({
            lists
        })

    } catch (e) {
        console.log(e)
        res.send({ message: "Server error" })
    }
})

//Get List router
router.get('/getList', async function (req, res) {
    try {
        const { listId } = req.body
        const list = await User.findOne({ listId })
        if (!user) {
            return res.status(404).json({ message: "List not found" })
        }
        return res.json({
            list
        })

    } catch (e) {
        console.log(e)
        res.send({ message: "Server error" })
    }
})

// Add list router
router.post('/addList',
    [
        check('username', "Uncorrect username").isLength({ min: 1 }),
        check('title', "Uncorrect title").isLength({ min: 1 }),
        check('color', "Uncorrect color").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { username, title, color } = req.body

            const user = await User.findOne({ username })
            const list = new List({ title: title, userId: user.id, color: color })
            user.listId.push(list.id)
            await list.save()
            await user.save()
            return res.json({ message: "List was created" })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


//Edit list router
router.put('/editList',
    [
        check('listId', "Uncorrect taskId").isLength({ min: 1 }),
        check('title', "Uncorrect text").isLength({ min: 1 }),
        check('description', "Uncorrect text").isLength({ min: 1 }),
        check('color', "Uncorrect text").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { listId, title, description, color } = req.body

            const list = await List.findOne({ id: listId })
            list.text = text
            list.completed = completed
            await task.save()
            return res.json({
                list: {
                    title: title,
                    description: description,
                    color: color
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })

//Delete List router
router.put('/deleteList',
    [
        check('listId', "Uncorrect listId").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }
            const { listId } = req.body

            const list = await List.findOne({ id: listId })
            const tasks = list.tasksId
            for (let i = 0; i < tasks.length; i++) {
                let task = tasks[i]
                const temp = await Task.findOneAndDelete({ task })
            }

            const userId = list.userId
            const user = await User.findOneAndUpdate(
                { userId },
                { $pull: { listId: { $in: [id] } } }
            )
            const temp = await List.findByIdAndDelete({ id })
            await list.save()
            await user.save()
            const response = await User.findOne({ userId })
            return res.json({
                response
            })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


module.exports = router