import { Request, Response } from "express";
import { ToDoServices } from "./todo.service";

const createToDo = async (req: Request, res: Response) => {
    const { user_id, title } = req.body;

    try {
        const result = await ToDoServices.createToDo(user_id, title)

        res.status(201).json({
            success: true,
            message: "ToDo created!",
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



const getToDo = async (req: Request, res: Response) => {
    try {
        const result = await ToDoServices.getToDo()

        res.status(200).json({
            success: true,
            message: "ToDos retrieved successfully",
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const getSingleToDo = async (req: Request, res: Response) => {
    try {
        const result = await ToDoServices.getSingleToDo(req.params.id as string)

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch todo" });
    }
}


const updateToDo = async (req: Request, res: Response) => {
    const { title, completed } = req.body;

    try {
        const result = await ToDoServices.updateToDo(title, completed, req.params.id!)

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update todo" });
    }
}


const deleteToDo = async (req: Request, res: Response) => {
    try {
        const result = await ToDoServices.deleteToDo(req.params.id as string)

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ success: true, message: "Todo deleted", data: null });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}

export const ToDoControllers = {
    createToDo,
    getToDo,
    getSingleToDo,
    updateToDo,
    deleteToDo
}