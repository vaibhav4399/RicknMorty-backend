import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

/* 
* Create an Express Application
*/

const app: Application = express();


/*
*  Middleware
TODO: Add middlewares for logging and testing 
*/

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(helmet());


/*
* Define Api routes
*/




// Define a route for the root path ('/')
// app.get('/', (req: Request, res: Response) => {
//   // Send a response to the client
//   res.send('Hello, T ypeScript + Node.js + Express!');
// });

export default app;
