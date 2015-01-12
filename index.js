var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('pos', function(msg){
    io.emit('pos', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
