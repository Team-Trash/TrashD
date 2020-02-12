const express   =   require("express");     //"include"
const app       =   express();              //initialize
const http      =   require("http");        //need http
const server    =   http.createServer(app); //initialize

const PORT      =   1111;   //Default is 80

server.listen(PORT);                        //Hey  listen!
app.use(express.static(__dirname + "/public/")); //setting the html directory
console.log("Listening on port: " + PORT);

//route
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/");
});