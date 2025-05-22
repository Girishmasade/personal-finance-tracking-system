import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 5004

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// app.get('/', (req, res) => {
//     res.send('Server started')
// })

app.listen(port, () => {
    console.log(`server started http://localhost:${port}`);
})