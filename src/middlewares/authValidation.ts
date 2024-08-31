import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
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

export {generateToken}