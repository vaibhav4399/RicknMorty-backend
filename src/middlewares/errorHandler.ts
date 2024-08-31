import { Request, Response, NextFunction } from "express";

const errorHandler = (err: customApiError , req: Request, res: Response, next: NextFunction) => {

    if(err instanceof customApiError){
        const response = {
            success: false,
            status: err.status,
            message: err.message
        }

        return res.status(err.status).json(response);
    }

    const response = {
        success: false,
        status: 500,
        message: "An unexpected error Occured"
    }

    return res.status(500).json(response);

}


class customApiError extends Error {

    status: number;

    constructor(status: number = 500, message: string = "Something went wrong") {
        super(message);
        this.status = status;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}


export {customApiError};

export default errorHandler;