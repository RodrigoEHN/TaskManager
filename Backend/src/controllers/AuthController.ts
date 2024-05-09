import { Request , Response} from "express"

import User from "../models/User"
import { hashPassword } from "../utils/auth"

export class AuthController {
    static createAccount = async (req : Request, res: Response) => {
        try {
            const { password, email } = req.body

            //Preventing duplicates
            const userExists = await User.findOne({email})
            if(userExists) {
                const error = new Error('This email already have an account')
                return res.status(409).json({error : error.message})
            }

            const user = new User(req.body)

            //Hashing password
            user.password = await hashPassword(password)

            await user.save()

            res.send('Account created. Please check your email to confirm your new account')
        } catch (error) {
            res.status(500).json({error: 'Server error'})
        }
    }
}