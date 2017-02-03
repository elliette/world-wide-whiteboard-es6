

// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', function(){
  //console.log(arguments);
socket.emit('draw', {start: arguments[0], end: arguments[1], strokeColor: arguments[2]});
})



socket.on('otherDrawer', function(data){
  //below will invoke the draw function in whiteboard.js with the values
  //found in the data object(data is received from socket.broadcast.emit in server.js)
  whiteboard.draw(data.start, data.end, data.strokeColor);
})

