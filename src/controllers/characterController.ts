import { Request,Response, NextFunction } from "express";
import Character from "../models/characterSchema";
import ICharacter from "../interfaces/characterInterface";
import { customApiError } from "../middlewares/errorHandler";


const getAllCharacters = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const page: string = req.query.page as string;
        const limit = 10;
        let pageNumber: number;
    
        if(page){
            pageNumber = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
        }else{
            pageNumber = 1;
        }

        const result: ICharacter[] | null = await Character.find({}).skip(limit * (pageNumber - 1)).limit(limit);

        const characterCount: number | null = await Character.countDocuments({});

        if(result && characterCount){

            const pageSize = Math.ceil((characterCount / limit));

            const response = {
                "info": {
                    "count": characterCount.toString(),
                    "pages": pageSize.toString(),
                    "next": pageSize == pageNumber ? "" : (pageNumber + 1).toString(),
                    "prev": pageNumber == 1 ? "" : (pageNumber - 1).toString()
                },
                "data": result
            }

            return res.status(200).json(response);

        }else{
            throw new customApiError(401, "Something went wrong while fetching the characters");
        }

    }
    catch(e){
        next(e);
    }



}


export const characterController = {
        getAllCharacters
}
