import express from 'express'
import { createServer } from "http"
import cors from 'cors'
const app = express()
const PORT = process.env.PORT

const server = createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (_, res) => {
    res.send("gc is working!!");
    return;
});

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))