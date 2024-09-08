import { createClient } from "redis";


/**
 * * Function to Initialize the Redis connection
 * @returns return a redis client 
 */

const intializeRedis =  () => {
    
    const redisClient =  createClient()
    
    redisClient.on('error', err => console.log("Redis Connection Errrir", err))
    redisClient.connect();
                        
    return redisClient;
}


const redisClient = intializeRedis()

export default redisClient;