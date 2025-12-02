let socket = io();

socket.on('connect', () => {
	console.log('connected' + socket.id);
});

$(() => {
	// console.log('Hello');

	let msglst = $('#msgList');
	let sndbtn = $('#sndmsg');
	let msgBox = $('#msgBox');
	let clrBtn = $('#clearBtn');

	clrBtn.click(() => {
		console.log('Clicked');
		msglst.val("");
	});

	$('#notify').css('display', 'none');

	sndbtn.click(() => {
		console.log('Message Send');
		$('#notify').css('display', 'initial');
		setTimeout(() => {
			$('#notify').text("Message Sent");
			setTimeout(() => {
				$('#notify').css('display', 'none');
			}, 2000);
		}, 1000);
		socket.usrnm = $('#username').val();

		socket.emit('sendMsg', {
			message: msgBox.val(),
			user: socket.usrnm
		});
		msgBox.val("");
	});

	socket.on('recvMsg', (data) => {
		let msgText = '';
		if (data.user === socket.usrnm) {
			msgText = `Me: ${data.message}\n`;
		} else {
			msgText = `${data.user}: ${data.message}\n`;
		}
		msglst.val(msglst.val() + msgText);
		msglst.scrollTop(msglst[0].scrollHeight);
	});
});