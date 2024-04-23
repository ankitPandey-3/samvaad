import { app } from "./app.js";
import { connectionDB } from "./db/connection.js";
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

connectionDB()
            .then(()=>{
                app.listen(process.env.PORT, ()=>{
                    console.log('Server running at port : ',process.env.PORT);
                })
            }).catch(()=>{
                console.log('DB failed');
            })

