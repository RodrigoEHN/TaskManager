import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExists (req: Request, res: Response, next: NextFunction) {
    try {
        const {taskId} = req.params
        
        const task = await Task.findById(taskId)

        if (!task) {
            const error = new Error('Unable to find task')
            return res.status(404).json({error: error.message })
        }
        req.task = task
        next()

    } catch (error) {
        res.status(500).json({error: 'Error found'})
    }
}

export function taskBelongsToPtoject (req: Request, res: Response, next: NextFunction) {
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error ('Not valid action')
        return res.status(400).json({error: error.message})
    }
    next()
}