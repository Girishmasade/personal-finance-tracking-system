import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/Database.config.js'
import dotenv from 'dotenv'
import routes from './routers/index.js'

dotenv.config({
    path: './.env'
})

const app = express()
const port = process.env.PORT || 5004

app.use(express.json())
app.use(cors())
app.use(cookieParser())

connectDB()

app.use('/api', routes)

// app.get('/', (req, res) => {
//     res.send('Server started')
// })

app.listen(port, () => {
    console.log(`server started http://localhost:${port}`);
})