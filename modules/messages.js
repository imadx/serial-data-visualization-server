var logger = require('./logger.js');

module.exports = {
	no_port_given: function(ports){
		logger();
		logger('serialPort', "________________________________________________________________________________");
		logger('serialPort', "");
		logger('serialPort', "COM port not configured.");
		logger('serialPort', "Please configure at ./settings/config.js OR use COM port name as an argument.");
		logger('serialPort', "-- (e.g. npm start COM4)");
		logger('serialPort', "");

		logger('serialPort', "available ports:");
		ports.forEach(function(port) {
			logger('serialPort', '--', port.comName, ':' , port.manufacturer);
		});
		logger('serialPort', "________________________________________________________________________________");
		logger();
	},
	welcome: function(){


		logger('server', ' ');
		logger('server', '	$$\\ $$\\      $$\\                 $$\\ $$\\   $$\\ ');
		logger('server', '	\\__|$$$\\    $$$ |                $$ |$$ |  $$ | ');
		logger('server', '	$$\\ $$$$\\  $$$$ | $$$$$$\\   $$$$$$$ |\\$$\\ $$  | ');
		logger('server', '	$$ |$$\\$$\\$$ $$ | \\____$$\\ $$  __$$ | \\$$$$  / ');
		logger('server', '	$$ |$$ \\$$$  $$ | $$$$$$$ |$$ /  $$ | $$  $$< ');
		logger('server', '	$$ |$$ |\\$  /$$ |$$  __$$ |$$ |  $$ |$$  /\\$$\\ ');
		logger('server', '	$$ |$$ | \\_/ $$ |\\$$$$$$$ |\\$$$$$$$ |$$ /  $$ | ');
		logger('server', '	\\__|\\__|     \\__| \\_______| \\_______|\\__|  \\__| ');
		logger('server', ' ');
			
	}
}