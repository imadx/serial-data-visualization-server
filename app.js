var express = require('express');
var app = express();
var path = require('path');

// initialize socket server
var http = require('http').Server(app);
var io = require('socket.io')(http);

// import serialport from npm
var serialport = require('serialport');

// configurations file
var config = require('./settings/config');
 
// logger and string messages
var logger = require('./modules/logger');
var messages = require('./modules/messages');
var devices = require('./modules/deviceInfo');

// use PORT env variable or use :8080
app.set('port', (process.env.PORT || 8080));

// use static directory
app.use(express.static(path.join(__dirname, 'public')));

// viewed at http://localhost:8080/:dashboardEndpoint
// configure dashboardEndpoint @ ./settings/config.js
app.get(config.dashboardEndpoint, function(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

http.listen(app.get('port'), function() {
	messages.welcome();

	var addr = http.address();
	var bind = typeof addr === 'string'
	? 'pipe ' + addr
	: 'port ' + addr.port;

	logger('server', 'Listening on ' + bind);
});


io.on('connection', function(socket) {

	logger('socket.io', 'a user connected');
	io.emit('serial-device', {data: devices.getDevice(), startedAt: new Date()});

	socket.on('disconnect', function() {
		logger('socket.io', 'a user disconnected');
		// a user has left our page - remove them from the visitorsData object
	});
});

var COM_portName = process.argv[2] || config.COM_PORT;
// list serial ports
serialport.list(function (err, ports) {

	if(err !== null){
		logger('serialPort', 'ERROR: couldn\'t generate a list of ports');
		logger('serialPort', err);
		process.exit(1);
	} else {
		devices.enumeratePorts(ports, config.COM_baudRate);

		// check if COM port mentioned and continue..
		continueWithPorts();
	}
});

function continueWithPorts(){

	if(COM_portName === undefined){
		messages.no_port_given(devices.getPorts());
	} else {

		logger('serialPort', 'Trying with COM port: ', COM_portName);
		var serial_port = new serialport(COM_portName, {
			baudRate: config.COM_baudRate,
			parser: serialport.parsers.readline("\n")
		});

		serial_port.on('open', showPortOpen);
		serial_port.on('data', sendSerialData);
		serial_port.on('close', showPortClose);
		serial_port.on('error', showError);

		function showPortOpen() {
			logger('serialPort', 'Port Opened, Data rate: ' + serial_port.options.baudRate);
			devices.newDevice(COM_portName, config.baudRate);

			io.emit('serial-device', {data: devices.getDevice(), startedAt: new Date()});
		}
		 
		function sendSerialData(data) {
			if(config.log_data_exchanged_on_console) {
				logger('serialPort', data);
			}

			io.emit('serial-data', {data: data, emittedAt: new Date()});
		}
		 
		function showPortClose() {
			logger('serialPort', 'port closed.');
		}
		 
		function showError(error) {
			logger('serialPort', error);
			logger('serialPort', "Please check if device is connected");
		}
	}

}