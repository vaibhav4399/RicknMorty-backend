import express, { Router } from 'express';
import { query } from 'express-validator';
import validateRequest from '../middlewares/requestValidation';
import { verifyToken } from '../middlewares/authValidation';
import { characterController } from '../controllers/characterController';


const characterRouter: Router = express.Router();

characterRouter.get(
    '/characters',
    verifyToken,
    query('page').optional().isString().withMessage("Incorrect format for the page value"),
    validateRequest,
    characterController.getAllCharacters
);


export default characterRouter;