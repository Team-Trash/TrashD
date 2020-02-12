const express   =   require("express");     //"include"
//const http      =   require("http");        //need http
const app = require("https-localhost")()    //need https
const server    =   http.createServer(app); //initialize
const port     =   8080;   //Default is 80

app.listen(port)   

const certs = await httpsLocalhost.getCerts()
const server = https.createServer(certs, app).listen(port)                       //Hey  listen!
app.use(express.static(__dirname + "/public/")); //setting the html directory
console.log("Listening on port: " + PORT);

//route
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/");
});