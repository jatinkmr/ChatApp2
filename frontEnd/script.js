let socket = io();

socket.on('connect', () => {
	console.log('connected' + socket.id);
});

$(() => {
	// console.log('Hello');

	let msglst = $('#msgList');
	let sndbtn = $('#sndmsg');
	let msgBox = $('#msgBox')

	sndbtn.click(() => { 		
		console.log('Message Send');
		socket.usrnm = $('#username').val();

		socket.emit('sendMsg', {
			message: msgBox.val(),
			user: socket.usrnm
		});
	});

	socket.on('recvMsg', (data) => { 
		if (data.user === socket.usrnm) {
			msglst.append(`Me : ${data.message} <br/>`);
		} else { 
			msglst.append(`${data.user} : ${data.message} <br/>`);
		}
	});
});