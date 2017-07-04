const ipc = require('node-ipc')

ipc.config.silent = true
ipc.config.retry = 1000

// Connects to server
ipc.connectToNet('namespace', 'master', 8000, function () {
	ipc.of.namespace.on('connect', function () {
		ipc.log('connected to world')
	})

	ipc.of.namespace.on('run calculation', function (data) {
		if (data.operation == 'multiply') {
			var ans = data.n1 * data.n2
		}
		console.log(data.n1, data.operation, data.n2, '=', ans)
	})
})
