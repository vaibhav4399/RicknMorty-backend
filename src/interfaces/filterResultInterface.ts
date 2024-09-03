import ICharacter from "./characterInterface"
import ILocation from "./locationInterface";

/**
 * * Interface to create the pagination result format
 */

interface IResult {
    info: {
        count: string,
        pages: string,
        next: string,
        prev: string
    },
    data: ICharacter[] | ILocation[]
}



export default IResult;