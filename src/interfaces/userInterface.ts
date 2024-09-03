import { Document } from "mongoose";

/**
 * * Interface for the User Schema
 */

interface IUser extends Document {
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string
}

export default IUser;