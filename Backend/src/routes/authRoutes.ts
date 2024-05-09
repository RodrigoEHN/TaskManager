import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErros } from "../middleware/validation";

const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('An user name is required'),

    body('password')
        .isLength({min:8}).withMessage('Your password must have at least 8 characteres'),
    body('password_confirmation').custom((value, {req}) => {
        if (value !== req.body.password){
            throw new Error('Different passwords')
        }
        return true
    }),

    body('email')
        .isEmail().withMessage('This is not a valid email'),
    handleInputErros,
    AuthController.createAccount
)

export default router