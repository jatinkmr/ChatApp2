const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use('/', express.static(
	path.join(__dirname, 'frontend')
));

io.on('connect', (socket) => { 
	console.log('New Socket Formed ' + socket.id);
	socket.emit('connect');
	
	socket.on('sendMsg', (data) => { 
		io.emit('recvMsg', data);
	});
});

const PORT = process.env.PORT || 4444;

server.listen(PORT, () => {
	console.log('server started at ....' + PORT);
	console.log('http://localhost:4444/');
});