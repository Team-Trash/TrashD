const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new
let map = [];

const LISTEN_PORT = 3333; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/");
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
        
    });

    //custom events
    socket.on('add-player', function(data) {//Add player to lobby across clients
        console.log('creating entities for ' + data);
        socket.broadcast.emit('construct-player', data);
    });

});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);