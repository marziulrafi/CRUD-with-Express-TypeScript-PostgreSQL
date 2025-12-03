import express, { Request, Response } from "express"
import config from "./config";
import initDB from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { ToDoRoutes } from "./modules/todo/todo.routes";


const app = express()
const port = config.port;


// Parser
app.use(express.json())
// app.use(express.urlencoded())

initDB()

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello!')
})


// Users CRUD
app.use('/users', userRoutes)

// ToDo CRUD
app.use('/todos', ToDoRoutes)


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found!",
    path: req.path
  })
})


app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})
