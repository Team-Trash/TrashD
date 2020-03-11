const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);
let rooms = 0;

const LISTEN_PORT = 3000;

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/");
});

//Websocket
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
        
    });

    //custom events
    socket.on('get-rooms', function(data) {//Add player to lobby across clients
        console.log('Getting rooms for ' + socket.id);

        let rooms = socketIO.sockets.adapter.rooms;

        socket.emit('return-rooms', rooms);
    });

    socket.on('new-room', function(data){
        let roomID = 'room' + rooms;
        socket.join(roomID);
        rooms++;
        socket.emit('return-room-id', roomID);
    });

    socket.on('join-room', function(data){
        socket.join(data);
        socket.emit('return-room-id', data);
    });

});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);