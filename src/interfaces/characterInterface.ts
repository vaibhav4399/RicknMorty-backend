import { Document} from 'mongoose';

/***
 * * Interface for the Character schema 
 */

interface ICharacter extends Document {
    _id: number,
    name: string,
    status: "Alive" | "Dead" | "unknown",
    species: string,
    type: string,
    gender: "Male" | "Female" | "Genderless" | "unknown",
    image: string,
    last_location: {
        name: string,
        location: number
    }
}

export default ICharacter;