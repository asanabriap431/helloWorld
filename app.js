var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
    
server.listen(7000);

//Cuando recibe una petición, se responde abriendo el archivo index.html
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

//Cada vez que alguien se conecta, se crea un nuevo socket
io.sockets.on('connection', function(socket) {
	
	//Cuando se recibe este evento con los datos, se envia el mensaje a todos los que estén conectados
    socket.on('sendMessage', function(data) {
        io.sockets.emit('newMessage', {msg: data});
    });
});