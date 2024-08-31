import mongoose, {Connection, Mongoose} from "mongoose";
import { DB1_URI, DB2_URI } from "./environment";

/**
 * TODO: Check if options are required for mongodb connection. If not remove in future.
 */

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


/**
 ** Establishes a connection to the databases
 * @return Returns a Mongoose connection object 
 */

const connection1: Connection = mongoose.createConnection(DB1_URI);

const connection2: Connection = mongoose.createConnection(DB2_URI);


export {connection1, connection2};