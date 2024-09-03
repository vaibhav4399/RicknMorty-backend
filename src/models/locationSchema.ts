import mongoose, { Schema } from 'mongoose';
import ILocation from '../interfaces/locationInterface';
import { connection1 } from '../config/dbConnection';

/**
 ** Create Location schema where the type is explicitly specified using the Location Interface  
*/

const locationSchema: Schema<ILocation> = new mongoose.Schema({

    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    dimension: {
        type: String,
        required: true
    },
    last_known: {
        type: [Number],
        required: false
    }

},
{
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    }
});

const Location = connection1.model<ILocation>('locations', locationSchema);

export default Location;