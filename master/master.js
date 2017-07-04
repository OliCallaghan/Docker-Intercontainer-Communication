const ipc = require('node-ipc')
const os = require('os')

ipc.config.silent = true

var slave_n = 0;
var slaves = [];

ipc.serveNet(os.hostname(), 8000, function () {
	ipc.server.on('connect', function (socket) {
		slaves.push(socket)
	})
})

// IMPORTANT DON'T FORGET!
ipc.server.start()

// Testing (run after 10 seconds)
setInterval(function () {
	if (slaves.length == 0) {
		throw "No connected slaves"
	} else {
		if (slave_n >= slaves.length) slave_n = 0
		console.log('sending calculation to slave')
		ipc.server.emit(slaves[slave_n], 'run calculation', {
			operation: 'multiply',
			n1: 5,
			n2: 7
		})
		slave_n += 1
	}
}, 1 * 1000)
