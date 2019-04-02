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
		socket.emit('clear');
	});

	socket.on('cleared', () => { 
		msglst.textContent = '';
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
	});

	socket.on('recvMsg', (data) => { 
		if (data.user === socket.usrnm) {
			msglst.append(`Me : ${data.message} <br/>`);
		} else { 
			msglst.append(`${data.user} : ${data.message} <br/>`);
		}
	});
});