import { Request,Response, NextFunction } from "express";
import Character from "../models/characterSchema";
import ICharacter from "../interfaces/characterInterface";
import { customApiError } from "../middlewares/errorHandler";
import IResult from "../interfaces/filterResultInterface";

const limit = 10;
let pageNumber: number;

/**
 * *Function to find the character based on the filter provided
 * @param filter Takes the filter in the form of mongodb query.
 * @param pageNumber Takes the page number as the input for pagination of results
 * @returns Returns the array of characters in JSON format or null
 */

const getCharacter = async (filter: { [key: string]: Object }, pageNumber?: number) => {
    if(filter){
        const filterI = filter;

        if(!pageNumber){
            const result: ICharacter | null = await Character.findOne(filterI);

            return result
        }

        const result: ICharacter[] | null  = await Character.find(filter).skip(limit * (pageNumber - 1)).limit(limit);

        const characterCount: number | null = await Character.find(filter).countDocuments();


        if (result && characterCount) {

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

            return response;

        }

        return null
    }
    return null;
}

/**
 * * Functiont to all the characters available in the database in a pagination format
 * @param req Takes the request parameters sent to the function
 * @param res Response to send the JSON response
 * @param next Used to get to next middleware or Error Reporting
 * @returns Returns a Response with result or Error in JSON format 
 */


const getAllCharacters = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const page: string = req.query.page as string;
    
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

/**
 * * Function to get the Character results based on the character ID
 * @param req Requests which contains the requests data
 * @param res Response used to send a JSON response 
 * @param next Used to go to next middleware or Error Reporting
 * @returns Returns a result or throws an Error in JSON format
 */

const getCharaterById = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const result: ICharacter | null | IResult = await getCharacter({"_id": {"$in": [req.params.id]}});

        if(!result) throw new customApiError(400, "The Required character was not found");

        return res.status(200).json(result);

    }
    catch(e) {
        next(e);
    }

}

/**
 * * Function to get the character results in the JSON format based on the filters
 * @param req Request parameters sent to the API 
 * @param res Response form the API in JSON Format
 * @param next Used to send the result or to Report Error
 * @returns Returns an result based on the filter or throws Error in JSON format
 */

const getCharacterFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const page: string = req.query.page as string;

        if (page) {
            pageNumber = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
        } else {
            pageNumber = 1;
        }

        const filter = req.body;
        let query: {[key: string]: Object} = {};

        for(const key in filter){
            const temp =  {"$in" : filter[key]}
            query[key] = temp
        }

        const result : ICharacter | IResult | null = await getCharacter(query, pageNumber)

        if(!result) throw new customApiError(400, "No Characterd found");

        return res.status(200).json(result)
    }
    catch(e){
        next(e);
    }
}

export const characterController = {
        getAllCharacters,
        getCharaterById,
        getCharacterFilter,
}
