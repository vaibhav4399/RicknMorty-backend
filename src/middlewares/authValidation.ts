import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_SECRET ,JWT_REFRESH_SECRET } from "../config/environment";
import { customApiError } from './errorHandler';

interface IPayload {
    user: {
        id: string
    }
}

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