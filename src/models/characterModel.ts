import mongoose, { Schema } from "mongoose";
import ICharacter from "../interfaces/characterInterface";
import { connection1 } from '../config/dbConnection';

/**
 ** Create a Charater schema there the type is explicitly specified using the Interface Character
*/

const characterSchema: Schema<ICharacter> = new mongoose.Schema({
    _id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Alive", "Dead", "unknown"],
        required: true
    },
    species: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Genderless", "unknown"],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    last_location: {
        name: {
            type: String,
            required: true
        },
        location: {
            type: Number,
            required: true
        }
    }
});


const Character = connection1.model<ICharacter>('character', characterSchema);

export default Character;
