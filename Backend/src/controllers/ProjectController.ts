import { json, type Request, type Response } from "express"
import Project from "../models/Project"

export class ProjectController {

    //Controller - Create Project
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        try {
            await project.save()
            res.send('Project created succesfuly')
        } catch (error) {
            console.log(error)
        }

        
    }

    //Controller - Get Projects
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    //Controller - Get Project by ID
    static getProjectById = async (req: Request, res: Response) => {
        const {id} = req.params
        console.log(id)
        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Unable to find project')
                return res.status(404).json({error: error.message })
            }
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }

    //Controller - Update Project
    static updateProject = async (req: Request, res: Response) => {
        const {id} = req.params
        try {
            const project =  await Project.findByIdAndUpdate(id, req.body)

            if (!project) {
                const error = new Error('Unable to find project')
                return res.status(404).json({error: error.message })
            }

            await project.save()
            res.send('The project has been updated')

        } catch (error) {
            console.log(error)
        }
    }

    //Controller - Delete Project
    static deleteProject = async (req: Request, res: Response) => {
        const {id} = req.params
        try {
            const project = await Project.findById(id)

            if (!project) {
                const error = new Error('Unable to find project')
                return res.status(404).json({error: error.message })
            }

            await project.deleteOne()
            res.send('The project has been deleted')

        } catch (error) {
            console.log(error)
        }
    }
}