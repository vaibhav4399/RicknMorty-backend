import { Document } from 'mongoose'

interface ILocation extends Document {
    _id: number,
    name: string,
    type: string,
    dimension: string,
    last_known: [number]
}

export default ILocation;