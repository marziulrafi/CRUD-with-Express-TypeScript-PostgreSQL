import { Router } from "express";
import { ToDoControllers } from "./todo.controller";

const router = Router()


router.post('/', ToDoControllers.createToDo)
router.get('/', ToDoControllers.getToDo)
router.get('/:id', ToDoControllers.getSingleToDo)
router.put('/:id', ToDoControllers.updateToDo)
router.delete('/:id', ToDoControllers.deleteToDo)



export const ToDoRoutes = router