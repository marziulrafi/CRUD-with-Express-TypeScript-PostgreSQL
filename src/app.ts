import express, { Request, Response } from "express"
import initDB from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { ToDoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";


const app = express()

// Parser
app.use(express.json())
// app.use(express.urlencoded())

initDB()

app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello!')
})

app.use('/users', userRoutes)

app.use('/todos', ToDoRoutes)

app.use('/auth', authRoutes)


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found!",
        path: req.path
    })
})


export default app
