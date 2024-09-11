import dotenv from 'dotenv';

/**
 ** Check if the environment and load the appropiate environment file 
*/

const envFile: string = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';


dotenv.config({path: envFile});

/**
 ** Encode the Username and Password if special characters present 
*/

const Username: string = encodeURIComponent(process.env.UNAME || '');
const Password: string = encodeURIComponent(process.env.PASSWORD || '');

const DB1: string = process.env.DB_RNM || ''
const DB2: string = process.env.DB_USER || ''


/**
 * * Create Connection strings for different Databases
 */

export const DB1_URI: string = `mongodb+srv://${Username}:${Password}@rickandmorty.db8faab.mongodb.net/${DB1}`;
export const DB2_URI: string = `mongodb+srv://${Username}:${Password}@rickandmorty.db8faab.mongodb.net/${DB2}`;


/**
 * * Export JWT Secrets
 */

export const JWT_SECRET: string = process.env.JWT_SECRET || '';
export const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || '';


/**
 * * Export Redis Session Secret
 */

export const REDIS_SESSION_SECRET: string = process.env.REDIS_SESSION_SECRET || '';