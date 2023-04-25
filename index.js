import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import 'dotenv/config'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ! Variables
const app = express()

const startServer = async () => {
  try {
    // ! Connect to our mongodb database
    await mongoose.connect(process.env.MONGO_URI)
    console.log('🚨 Database connected')

    // ! Parse JSON to req.body
    app.use(express.json())

    // ! Middleware
    // Logger
    app.use((req, res, next) => {
      console.log(`🚨 Incoming request: ${req.method} ${req.url}`)
      next()
    })

    // ! Routes
    app.use('/api', router)
    app.use(express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })

    // ! 404 catch all middleware
    app.use((req, res) => {
      return res.status(404).json({ message: 'Route not found' })
    })

    // ! Starting our node server after we've connected to our database
    app.listen(process.env.PORT, () => console.log(`🚀 Server up and running and listening on port ${process.env.PORT}`))
  } catch (err) {
    console.log('🆘 Something went wrong starting the app')
    console.log(err)
  }
}

startServer()