const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const userRouter = require('./routes/user.routes')
const listsRouter = require('./routes/lists.routes')
const tasksRouter = require('./routes/tasks.routes')
const infoRouter = require('./routes/info.routes')
const app = express()
const PORT = process.env.PORT || process.env.SERVER__PORT

const mongoDbUrl = process.env.DATABASE__URL

app.use(cors())

app.use(express.json())
app.use(express.static('static'))
app.use('/api/user', userRouter)
app.use('/api/lists', listsRouter)
app.use('/api/tasks', tasksRouter)
app.use('/', infoRouter)

const start = async () => {
	try {
		await mongoose.connect(mongoDbUrl),
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}

		app.listen(PORT, () => {
			console.log('Server started on port ', PORT)
		})
	} catch (e) {}
}

start()
