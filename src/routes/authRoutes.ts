import express, {Router} from 'express';
import { body } from 'express-validator';
import validateRequest from '../middlewares/requestValidation';
import { authController } from '../controllers/authController';


const authRouter: Router = express.Router();

/**
 * * API Route for the User Register Funtionality 
 */

authRouter.post(
    '/register',
    body('username').notEmpty().withMessage("username should not be empty").isLength({ min: 8, max: 15 }).withMessage("The Username should be between 8 and 15 characters").isString().withMessage("The username should be a string"),
    body('password').notEmpty().withMessage("password should not be empty").isLength({ min: 8, max: 15 }).withMessage("The Passsord should be between 8 and 15 characters").isString().withMessage("The password should be between 8 and 15 characters"),
    body('firstname').notEmpty().withMessage("firstname should not be empty").isString().withMessage("The Firstname should be a string"),
    body('lastname').notEmpty().withMessage("lastname should not be empty").isString().withMessage("The Lastname should be a string"),
    body('email').notEmpty().withMessage("email should not be empty").isEmail().withMessage("Please enter a valid email"),
    validateRequest,
    authController.register
);

/**
 * * API Route for the User Login Functionality
 */

authRouter.post(
    '/login',
    body('username').notEmpty().withMessage("username should not be empty").isLength({ min: 8, max: 15 }).withMessage("The Username should be between 8 and 15 characters").isString().withMessage("The username should be a string"),
    body('password').notEmpty().withMessage("password should not be empty").isLength({ min: 8, max: 15 }).withMessage("The Passsord should be between 8 and 15 characters").isString().withMessage("The password should be between 8 and 15 characters"),
    validateRequest,
    authController.login
)

export default authRouter;