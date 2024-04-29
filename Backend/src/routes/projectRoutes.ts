import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErros } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { ProjectExists } from "../middleware/project";
import { taskBelongsToPtoject, taskExists } from "../middleware/task";

const router = Router();

//Creating new projects
router.post('/',
    body('projectName')
        .notEmpty().withMessage('Project name required'),
    body('clientName')
        .notEmpty().withMessage('Client name required'),
    body('description')
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

//***ROUTES FOR TASKS***

router.param('projectId', ProjectExists)

router.post('/:projectId/tasks',

    body('name')
        .notEmpty().withMessage('Task name required'),
    body('description')
        .notEmpty().withMessage('Descrpition required'),
    handleInputErros,
    TaskController.createTask
)

router.get('/:projectId/tasks',

    TaskController.getProjectTask
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToPtoject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Not valid ID'),
    handleInputErros,
    TaskController.getTaskByd
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Not valid ID'),
    body('name')
        .notEmpty().withMessage('Task name required'),
    body('description')
        .notEmpty().withMessage('Descrpition required'),
    handleInputErros,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Not valid ID'),
    handleInputErros,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Not valid ID'),
    body('status')
        .notEmpty().withMessage('Status required'),
    handleInputErros,
    TaskController.updateStatus
)

export default router