const express = require("express")
const mongoose = require("mongoose")
const config = require("./config.json")
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const listsRouter = require("./routes/lists.routes")
const tasksRouter = require("./routes/tasks.routes")
const app = express()
const PORT = process.env.PORT || config.serverPort
const corsMiddleware = require('./middleware/cors.middleware')

app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/lists", listsRouter)
app.use("/api/tasks", tasksRouter)

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