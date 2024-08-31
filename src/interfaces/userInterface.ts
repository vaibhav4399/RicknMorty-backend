import { Document } from "mongoose";

interface IUser extends Document {
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string
}

export default IUser;