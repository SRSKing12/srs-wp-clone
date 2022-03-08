import express from 'express'
import connection from './db.js'
import dotenv from 'dotenv'
import route from './routes/Route.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from "http"
import { Server } from "socket.io"
import {path} from "path"

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const httpServer = createServer(app)
httpServer.listen()

const io = new Server(httpServer)

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", route)

connection()

// For deployment
app.use(express.static(path.join(__dirname, "/client/build")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})

let users = []
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({userId, socketId})
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

io.on("connection", (socket) => {
    console.log("User connected successfully!")

    // Connect Users
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    // Send Messages
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit("getMessage", {
            senderId, text
        })
    })

    // Disconnect
    socket.on("disconnect", () => {
        console.log("User was disconnected!")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})


app.listen(port, () => console.log(`App is running on port - ${port}`))