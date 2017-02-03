var path = require('path');
var socketio = require('socket.io');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);

//below is server for the collection of all sockets
var io = socketio(server);

io.on('connection', function (socket) {
    // /* This function receives the newly connected socket.
    //    This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);


        //drawingObj contains start coordinates, end coordinates, and color
        //(refer to draw function in whiteboard.js -- these are its arguments)
    socket.on('draw', function(drawingObj){
            //below emits drawingObj info to all other sockets (not including the drawer)
        socket.broadcast.emit('otherDrawer', drawingObj);
    })


    socket.on('disconnect', function () {
    console.log("Sad things");
    })
});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
