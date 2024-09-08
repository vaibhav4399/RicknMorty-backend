import { Request, Response,NextFunction } from "express";
import Location from "../models/locationSchema";
import ILocation from "../interfaces/locationInterface";
import { customApiError } from "../middlewares/errorHandler";
import IResult from "../interfaces/filterResultInterface";
import redisClient from "../config/redisConnection";

const limit: number = 10;
let pageNumber: number;

/**
 * * Function to return an array for all the locations in a pagination format
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Next Function
 * @return Returns an output of all locations or throws an Error in JSON format
 */

const getLocations = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const page: string = req.query.page as string;
    
        if(page){
            pageNumber = parseInt(page, 10) > 0 ? parseInt(page, 10) :  1; 
        }
        else {
            pageNumber = 1;
        }

        const redisKey = `locations:${pageNumber}`;

        const cachedData = await redisClient.get(redisKey);

        if(cachedData){
            return res.status(200).json(JSON.parse(cachedData));
        }
    
        const result: ILocation[] | null = await Location.find({}).skip(limit * (pageNumber - 1)).limit(limit);
    
        const locationsCount: number = await Location.find({}).countDocuments();
    
        if(result && locationsCount){

            const pageSize: number = Math.ceil(locationsCount / limit);

            if(pageNumber > pageSize) throw new customApiError(400, "No Data Exists in this realm")

            const response: IResult = {
                "info" : {
                    "count": locationsCount.toString(),
                    "pages": pageSize.toString(),
                    "next": pageSize === pageNumber ? "" : (pageNumber + 1).toString(),
                    "prev": pageNumber === 1 ? "" : (pageNumber - 1).toString()
                },
                "data": result
            }
            
            await redisClient.set(redisKey, JSON.stringify(response), {EX: 60 * 60 * 24})

            res.status(200).json(response);
        }
        else{
            throw new customApiError(400, "Something went wrong while fetching the locations");
        }
    }
    catch(e){
        next(e);
    }


}

/**
 * * Function to return the Locations based on the ID
 * @param req HTTP Request 
 * @param res HTTP Response
 * @param next Next Function
 * @return Return an output of location based on id or throws and Error in JSON format
 */

const getLocationsById = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const locationId: string = req.params.id;
        
        if(!locationId) throw new customApiError(400, "Location ID not found");

        const result: ILocation | null  = await Location.findOne({"_id": {"$in": [locationId]}});

        if(!result) throw new customApiError(400, "Location with the given id not found");

        res.status(200).json(result);

    }
    catch(e) {
        next(e);
    }



}


export const locationController = {
    getLocations,
    getLocationsById
}