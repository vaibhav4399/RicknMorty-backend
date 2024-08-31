import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { customApiError } from "../middlewares/errorHandler";
import User from "../models/userSchema";
import IUser from "../interfaces/userInterface";
import { generateToken } from "../middlewares/authValidation";

/**
 * * Function to handle the registration of new user along with JWT tokens and cookie
 * @param req Takes the HTTP Request
 * @param res HTTP Response
 * @param next Next function
 * @return JSON object with access token along with cookie
 */

const register = async (req: Request, res: Response, next: NextFunction) => {

    const {username, firstname, lastname, email, password} = req.body;

    try {
        let user: IUser | null = await User.findOne(
            {
                $or: [
                    {username: username},
                    {email: email}
                ]
            }
        );
        if(user){
            const status: number = 400;
            const message: string = "The user with the username or email already exists"

            throw new customApiError(status, message);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username: username,
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname
        })

        // console.log(username, email, firstname, lastname, hashedPassword);

        user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        const {accessToken, refreshToken} =  generateToken(payload);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({accessToken});

    }
    catch(e){
        next(e);
    }

}

/**
 * * Function to handle the login process. Returns a JSON object along with the access token and cookie
 * @param req HTTP Requests
 * @param res HTTP Response
 * @param next Next Function
 * @returns Returns a JSON object with access token and a cookie
 */

const login = async (req: Request, res: Response, next: NextFunction) => {

    const {username, password} = req.body;

    try {
        let user: IUser | null = await User.findOne({username: username}) 

        if(user){
            const passMatch = await bcrypt.compare(password, user?.password)
            if(!passMatch) throw new customApiError(400, "Invalid Credentials");
            
            const payload = {
                user: {
                    id: user.id
                }
            }

            const { accessToken, refreshToken } = generateToken(payload);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({ accessToken });
        }
        else{
            throw new customApiError(400, "User with the given username not found");
        }

    }
    catch(e) {
        next(e);
    }
}


export const authController = {
    register,
    login
}