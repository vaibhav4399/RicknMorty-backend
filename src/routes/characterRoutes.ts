import express, { Router } from 'express';
import { param, query, body } from 'express-validator';
import validateRequest from '../middlewares/requestValidation';
import { verifyToken } from '../middlewares/authValidation';
import { characterController } from '../controllers/characterController';

const genderOptions = ["Male", "Female", "unkown"];
const stausOptions = ["Alive", "Dead", "unkown"];

/**
 * * Define a Character Router to handle request for the characters
 */

const characterRouter: Router = express.Router();

/**
 * * API Route to get all the characters
 */

characterRouter.get(
    '/characters',
    verifyToken,
    query('page').optional().isString().withMessage("Incorrect format for the page value"),
    validateRequest,
    characterController.getAllCharacters
);

/**
 * * API Route to get the results based on the ID
 */

characterRouter.get(
    '/character/:id(\\d+)',
    verifyToken,
    param("id").notEmpty().withMessage("Character id is required").isString().withMessage("Invalid format for character ID"),
    validateRequest,
    characterController.getCharaterById
);

/**
 * * API Route to get the results based on the filters
 */

characterRouter.get(
    '/character/filter',
    verifyToken,
    body("gender").optional().isIn(genderOptions).withMessage("Invalid gender options"),
    body("status").optional().isIn(stausOptions).withMessage("Invalid Status Options"),
    query("page").optional().isString().withMessage("Incorrect format for the page value"),
    validateRequest,
    characterController.getCharacterFilter
);


export default characterRouter;