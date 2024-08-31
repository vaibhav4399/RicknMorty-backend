import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/userInterface";
import { connection2 } from "../config/dbConnection";

/**
 * * Create the User Schema where the type is explicitly specified 
 */

const userSchema: Schema<IUser> = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, {timestamps: true});

const User = connection2.model("Users", userSchema);

export default User;

