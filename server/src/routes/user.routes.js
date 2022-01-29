const Router = require("express")
const User = require("../models/User")
const List = require("../models/List")

const router = new Router()


router.post('/addList', async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Uncorrect request", errors })
        }
        const { name, userId, colorId } = req.body


        const user = await User.findOne({ username })


        const list = new List({ email, password: hashPassword, username })
        await list.save()
        return res.json({ message: "User was created" })

    } catch (e) {
        console.log(e)
        res.send({ message: "Server error" })
    }
})


router.get('/getLists', async function (req, res) {
    try {
        const { username } = req.body
        const user = await User.find({ username })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.json({
            user: {
                id: user.id,
                username: user.username,
                userIcon: user.userIcon
            }
        })

    } catch (e) {
        console.log(e)
        res.send({ message: "Server error" })
    }
})




router.get('/api/auth/registration', (req, res) => {
    res.send('Hello this is registration page')
})

router.get('/api/auth/login', (req, res) => {
    res.send('Hello this is login page')
})
module.exports = router