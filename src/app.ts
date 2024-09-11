import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import session from 'express-session';
import RedisStore from 'connect-redis';
import errorHandler from './middlewares/errorHandler';
import authRouter from './routes/authRoutes';
import characterRouter from './routes/characterRoutes';
import locationRouter from './routes/locationRoutes';
import redisClient from './config/redisConnection';
import { REDIS_SESSION_SECRET } from './config/environment';


/* 
* Create an Express Application
*/

const app: Application = express();

/**
 * * Create a redis Store using the redis client for session management
 */

const redisStore = new RedisStore({
    client: redisClient
})


/*
*  Middleware
TODO: Add middlewares for logging and testing 
*/

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: '',
    credentials: true,
    allowedHeaders: [
        "set-cookie",
        "Content-Type",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Credentials",
    ],
}));
app.use(helmet());
app.use(cookieParser());
app.use(compression());
app.use(session({
    store: redisStore,
    resave: false,
    secret: REDIS_SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
    }
}))


/*
* Define Api routes
*/

app.use('/api/auth', authRouter);
app.use('/api', characterRouter);
app.use('/api', locationRouter);


app.get('/test-cookie', (req, res) => {
    res.cookie("test-cookie", "test-value", {maxAge: 90000, httpOnly: true})
    res.send("cookie is set")
})

app.get('/check-session', async (req,res) => {
    console.log('Checking session for:', req.sessionID);
    console.log("Session:", req.session)

    const session_id = req.cookies['connect.sid']

    let session = await redisClient.get(`sess:${session_id}`);
    console.log(session)

    if (!session) return res.status(401).json({ message: 'No session found' });

    session = JSON.parse(session)
    res.cookie('connect.sid', session_id, { httpOnly: true, secure: true, sameSite: 'none', path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(200).json({ message: 'User is logged in', userID: req.session.userID });
})

/**
 * * Middleware for handling errors
 */

app.use(errorHandler);

// Define a route for the root path ('/')
// app.get('/', (req: Request, res: Response) => {
//   // Send a response to the client
//   res.send('Hello, T ypeScript + Node.js + Express!');
// });

export default app;
