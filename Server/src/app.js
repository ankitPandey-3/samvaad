import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

//import routes

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

//initialize routes


export { app };



