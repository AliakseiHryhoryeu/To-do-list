const express = require("express")
const mongoose = require("mongoose")
const config = require("./config.json")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const mainRouter = require("./routes/main.routes")
const app = express()
const PORT = config.serverPort
const corsMiddleware = require('./middleware/cors.middleware')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use("/", mainRouter)
app.use("/api/auth", authRouter)
app.use("/api/files", authRouter)

const start = async () => {
    try {
        await mongoose.connect(config.dbUrl),{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {

    }
}

start()