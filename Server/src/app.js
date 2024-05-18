import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { checkAuth } from './middlewares/auth.middleware.js'
//import routes
import AUTHROUTER from './routes/users.route.js'
import CHATROUTER from './routes/chat.route.js'
import MESSAGEROUTER from './routes/message.route.js'
const app = express();

//Middlewares
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkAuth);

//initialize routes
app.use('/api/v1/auth', AUTHROUTER);
app.use('/api/v1/chat', CHATROUTER);
app.use('/api/v1/message', MESSAGEROUTER);

export { app };



