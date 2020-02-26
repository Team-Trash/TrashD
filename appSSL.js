//running this instead of app e.g. 'node appSSL.js' instead of 'node app.js' lets you pretend to serve your page over HTTPS
//HTTPS is required for other devices connecting your localhost (i.e. mobile) to access accelerometers and other device sensors.
//note this is a bit hacky and if you restart your serve your browser may not let you visit as the new SSLL cert != the new one
//if this happens clear all your browsing data and restart browser (confirmed this workd on ios safari)
//for desktop use Chrome as it seems to alows let you bypass ("proceeding to unsafe site")

//STEPS (this will allow Aframe/WebXR API access mobile platform sensors when accessing this server):
//1. run 'node createCerts.js'
//2. run 'node appSSL.js'
//3. go to 'https://localhost:1111'
//4. ignore "safety warnings" from brwoser and go ahead to site anyhow
//5. after creating certs you shouldn't have to run 'node createCerts.js' again until you move to another machine

const https     = require('https');
const forge     = require('node-forge');
const fs        = require('fs');
const express   = require('express');
const app       = express();

//const vars
const LISTEN_PORT = 1111;

//middleware - set default html folder
app.use(express.static(__dirname + '/public'));

/************* CREATE ROUTES ***************/
app.get('/', function(req, res) {
    res.sendFile(__dirname + 'public/index.html');
});

app.get('/color', function(req,res) {
    res.sendFile(__dirname + '/public/color.html');
});

app.get('/controller', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');
});


/************* LOAD SSL CERTS (if you ran 'node createCerts.js') ***************/
let privateKeyPem = '';
let certPem = '';

//check for ssl cert files
if (fs.existsSync('./SSL_PRIV_KEY.pem')) {
    privateKeyPem = fs.readFileSync('./SSL_PRIV_KEY.pem', 'utf8');
    console.log(privateKeyPem);
}
else {
    console.warn("run 'node ./createCerts.js' first");
    process.exit(); //kill process so we can run
}

if (fs.existsSync('./SSL_CERT.pem')) {
    certPem = fs.readFileSync('./SSL_CERT.pem', 'utf8');
    console.log(certPem);
}    
else {
    console.warn("run 'node ./createCerts.js' first");
    process.exit(); //kill process so we can run
}

/************* CREATE HTTPS SERVER ***************/
console.log('HTTPS server being created ...');
const options = {
    key: privateKeyPem,
    cert: certPem
};
const secureServer = https.createServer(options, app);




/************* CREATE SOCKETS AND SOCKET EVENTS ***************/
const socketIO     = require('socket.io')(secureServer); //hello I am new

//websocket stuff
var players = [];
var playerCount = 0;

function Player(id, score){
    this.id = id;
    this.score = score;
}
socketIO.on('connection', function(socket) {
    //WHEN SOCKETIO IS START
    console.log('User connect: ' + socket.id);
    console.log('There are: ' + players.length + " user(s) in the server");
    playerCount += 1;
    console.log("Adding " + playerCount);   
    socketIO.sockets.emit('user_number', playerCount);

    socket.on('disconnect', function(data) {
        console.log('User disconnected: ' + socket.id);
        playerCount -=1;
        console.log("Deducted: " + playerCount);
        delete socket.id;
    });
    //custom events
    //socket = one client
    //socketIO.sockets = all clients
    socket.on('start', function(data) {
        var player = new Player(socket.id, data.score);
        players.push(player);
        console.log(socket.id + " " + data.score);
        //Get input score from the game.js to here
        socketIO.sockets.emit('player_id', socket.id);
    });

    socket.on('update', function(data){
        var player;
        for (var i = 0; i < players.length; i++){
            if(socket.id == players[i].id){
                player = players[i];
            }
        }
        player.score = data.score;
        socket.emit('player_score', player.score);
    });

    socket.on('saveScore', function(data){
        if(playerCount == 2 ){
        var position;
        for(var i = 0; i < players.length; i++){
            if(socket.id != players[i].id){
                position = i;
            }
        }       
        socket.emit('opponent_score', players[position].score);
        }
    });
});

/************* RUN HTTPS SERVER ***************/
secureServer.listen(LISTEN_PORT);     //start server
console.log('Listening on port: ' + LISTEN_PORT );
