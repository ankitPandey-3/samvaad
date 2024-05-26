import { app } from "./app.js";
import { connectionDB } from "./db/connection.js";
import dotenv from 'dotenv';
import { Server } from 'socket.io';
dotenv.config({
    path: './.env'
});

connectionDB()
            .then(()=>{
                const server = app.listen(process.env.PORT, ()=>{
                    console.log('Server running at port : ',process.env.PORT);
                })

                const io = new Server(server,{
                    pingTimeout: 60000,
                    cors: {
                        origin: process.env.CORS_ORIGIN,
                        // credentials: true,
                      },
                });

                io.on("connection",(socket)=>{
                    console.log('connected to socket.io');

                    socket.on('setup', (userData) => {
                        // console.log(userData._id)
                        socket.join(userData._id);  //particular room
                        socket.emit('connected');   //connected
                    });

                    socket.on('join chat', (room)=>{
                        socket.join(room);
                        console.log('User Joined Room: ' + room)
                    });

                    socket.on('typing', (room) => socket.in(room).emit('typing'));
                    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

                    socket.on('new message', (newMessageReceived) => {
                        var chat = newMessageReceived.chat;
                        // console.log(newMessageReceived)
                        if(!chat.users) return console.log('Chat users not defined');

                        chat.users.forEach(user => {
                            if(user._id == newMessageReceived.sender._id) return;
                            
                            socket.in(user._id).emit("message received", newMessageReceived);
                        })
                    })
                });




            }).catch(()=>{
                console.log('DB failed');
            })

