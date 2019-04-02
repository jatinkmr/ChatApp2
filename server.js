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

const PORT = process.env.PORT || 4444;

server.listen(PORT, () => {
	console.log('server started....');
});