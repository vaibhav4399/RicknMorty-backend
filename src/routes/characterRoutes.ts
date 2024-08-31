import express, { Router } from 'express';
import { query } from 'express-validator';
import validateRequest from '../middlewares/requestValidation';


const characterRouter: Router = express.Router();

characterRouter.get(
    '/api/characters',
    query('page').optional().isString().withMessage("Incorrect format for the page value"),
    validateRequest

);


export default characterRouter;