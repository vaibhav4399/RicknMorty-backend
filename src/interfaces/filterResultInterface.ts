import ICharacter from "./characterInterface"

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
    data: ICharacter[]
}



export default IResult;