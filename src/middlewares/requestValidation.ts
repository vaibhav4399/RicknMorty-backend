import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { customApiError } from "./errorHandler";

/**
 * * Function used to Validate request parameters
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Next Function
 */

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    try{
        if(!errors.isEmpty()){
            const message = errors.array()[0].msg;
            throw new customApiError(400, message)
        }
        next();
    }
    catch(e){
        next(e);
    }

}

export default validateRequest;