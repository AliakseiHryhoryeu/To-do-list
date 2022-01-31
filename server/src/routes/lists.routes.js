const Router = require("express")
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
const List = require("../models/List")

const router = new Router()


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

//Get lists router
router.get('/getLists', async function (req, res) {
    try {
        const { id } = req.body

        const user = await User.findOne({ id })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const userLists = user.listId
        const list = await List.find({ userLists })

        return res.json({
            list
        })

    } catch (e) {
        console.log(e)
        res.send({ message: "Server error" })
    }
})

//Get List router
router.get('/getList', async function (req, res) {
    try {
        const { id } = req.body
        const list = await User.findOne({ id })
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


module.exports = router