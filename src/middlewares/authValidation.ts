import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET ,JWT_REFRESH_SECRET } from "../config/environment";
import { customApiError } from './errorHandler';

/**
 * * Interface for  the Payload given to generate the token
 */

interface IPayload {
    user: {
        id: string
    }
}

/**
 * * Function to genereate the JWT token for the user
 * @param payload
 * @returns Returns a Signed JWT access token and refresh token
 */

const generateToken = (payload: IPayload) => {

    try {
         const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '3h' });
         const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '7d'});
         return {accessToken, refreshToken};
    }
    catch (e) {
        throw new customApiError(500, "Something went wrong")
    }

}

/**
 * * Function to verify the JWT token for  API Requests
 * @param req HTTP Requests
 * @param res HTTP Response
 * @param next Used to go to next middleware or for Error Reporting
 */

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers['authorization']?.split(' ')[1];

    try {
        if(!token){
            throw new customApiError(401, "Access Denied. Could not authorize the user");
        }

        const decoded = jwt.verify(token, JWT_SECRET) as string | IPayload;

        if(typeof decoded !== 'string'){
            if(decoded && decoded.user){
                req.userId = decoded.user.id;
            }
            next();
        }else{
            throw new customApiError(401, "Invalid token ID");
        }

    }
    catch(e){
        let err = e;
        if(e instanceof jwt.JsonWebTokenError){
            err = new customApiError(401, e.toString())
        }
        next(err);
    }

}

export {generateToken, verifyToken};