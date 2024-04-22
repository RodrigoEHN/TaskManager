import { Router } from "express";
import { body , param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErros } from "../middleware/validation";

const router = Router();

//Creating new projects
router.post('/', 
    body ('projectName')
        .notEmpty().withMessage('Project name required'),
    body ('clientName')
        .notEmpty().withMessage('Client name required'),
    body ('description')
        .notEmpty().withMessage('Descrpition required'),
    handleInputErros,
ProjectController.createProject
)

//Getting all projects
router.get('/', ProjectController.getAllProjects)

//Getting project by ID
router.get('/:id', 
    param('id').isMongoId().withMessage('Not valid ID'),
    handleInputErros,
ProjectController.getProjectById
)

//Updating project
router.put('/:id',
    param('id').isMongoId().withMessage('Not valid ID'),
    body('projectName')
        .notEmpty().withMessage('Project name required'),
    body('clientName')
        .notEmpty().withMessage('Client name required'),
    body('description')
        .notEmpty().withMessage('Descrpition required'),
    handleInputErros,
    ProjectController.updateProject
)

//Getting project by ID
router.delete('/:id', 
    param('id').isMongoId().withMessage('Not valid ID'),
    handleInputErros,
ProjectController.deleteProject
)

export default router