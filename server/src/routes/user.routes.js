const Router = require("express")


const router = new Router()

router.get('/', (req, res) => {
    res.send('Hello world')
})
router.get('/api/auth/registration', (req,res) =>{
    res.send('Hello this is registration page')
})

router.get('/api/auth/login', (req,res) =>{
    res.send('Hello this is login page')
})
module.exports = router