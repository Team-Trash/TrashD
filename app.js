const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);
let rooms = 0;

const LISTEN_PORT = process.env.PORT || 3000;

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/");
});

//Websocket
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected!');
    });

    //custom events
    socket.on('disconnecting', function(){
        for (room in socket.rooms){
            if(room.includes("room")){
                socket.to(room).emit('forfeit');
            }
        }
    });
    
    socket.on('get-rooms', function(data) {//Add player to lobby across clients
        console.log('Getting rooms for ' + socket.id);

        let rooms = socketIO.sockets.adapter.rooms;

        socket.emit('return-rooms', rooms);
    });

    socket.on('new-room', function(){
        let roomID = 'room' + rooms;
        socket.join(roomID);
        console.log(socket.id + " has created " + roomID);
        rooms++;
        socket.emit('return-room-id', roomID);
    });

    socket.on('join-room', function(roomID){
        console.log(socket.id + " has joined " + roomID);
        socket.join(roomID);
        socket.to(roomID).emit('ready-room', socket.id,);
        socket.emit('return-room-id', roomID);
    });

    socket.on('leave-room', function(roomID){
        console.log(socket.id + " left " + roomID);
        socket.to(roomID).emit('forfeit');
        socket.leave(roomID);
    });

    socket.on('get-countdown', function(count, roomID){
        socket.to(roomID).broadcast.emit('send-countdown', count);
    });

    socket.on('get-time', function(time, roomID){
        socket.to(roomID).broadcast.emit('send-time', time);
    })

    socket.on('get-score', function(score, roomID){
        socket.to(roomID).broadcast.emit('send-score', score);
    })

    socket.on('get-opponent-rotation', function(rotation, roomID){
        socket.to(roomID).broadcast.emit('send-opponent-rotation', rotation);
    });

});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);