import express, {Router} from 'express';
import {param, query} from 'express-validator'
import validateRequest from '../middlewares/requestValidation';
import { verifyToken } from '../middlewares/authValidation';
import { locationController } from '../controllers/locationController';


/**
 * * Define a Location Router to handle requests related to location
 */

const locationRouter: Router =  express.Router();


/**
 * * API Route to get all the location present
 */

locationRouter.get(
    '/locations',
    verifyToken,
    query('page').optional().isString().withMessage("The Format for the page is Invalid"),
    validateRequest,
    locationController.getLocations
);

locationRouter.get(
    "/location/:id(\\d+)",
    verifyToken,
    param('id').notEmpty().withMessage("Location ID not provided").isString().withMessage("Invalid Format for the Location id"),
    validateRequest,
    locationController.getLocationsById
);

export default locationRouter;