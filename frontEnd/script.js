let socket = io();

socket.on('connect', () => {
	console.log('connected' + socket.id);
});

$(() => {
	// console.log('Hello');

	let msglst = $('#msgList');
	let sndbtn = $('#sndmsg');
	let msgBox = $('#msgBox')
	let lgnbtn = $('#login');

	$('#chatDiv').css("display", "none");

	lgnbtn.click(() => { 
		// console.log('Button Clicked');	
		socket.usrnm = $('#usr').val();		

		$('#loginDiv').css("display", "none");
		$('#chatDiv').css("display", "block");
	});

	sndbtn.click(() => { 
		// console.log('Message Send');
		socket.emit('sendMsg', {
			message: msgBox.val(),
			user: socket.usrnm
		});
	});

	socket.on('recvMsg', (data) => { 
		if (data.user === socket.usrnm) {
			msglst.append(`Me : ${data.message}`);
		} else { 
			msglst.append(`${data.user} : ${data.message}`);
		}
	});
});