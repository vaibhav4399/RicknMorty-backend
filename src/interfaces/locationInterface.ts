import { Document } from 'mongoose'

/**
 * * Interface for the location Schema
 */

interface ILocation extends Document {
    _id: number,
    name: string,
    type: string,
    dimension: string,
    last_known: [number]
}

export default ILocation;