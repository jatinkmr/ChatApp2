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
	let myList = $('#myMsg');

	clrBtn.click(() => { 
		console.log('Clicked');
		msglst.text("Your Messages : ");
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
		msgBox.text("");
	});

	socket.on('recvMsg', (data) => { 
		if (data.user === socket.usrnm) {
			myList.append($('<li>').text(`Me : ${data.message}`).css('text-align', 'right'));
			// msglst.append(`Me : ${data.message} <br/>`);
		} else { 
			myList.append($('<li>').text(`${data.user} : ${data.message}`).css('text-align', 'left'));
			// msglst.append(`${data.user} : ${data.message} <br/>`);
		}
	});
});