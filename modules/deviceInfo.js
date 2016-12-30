var logger= require('./logger.js');

var Device = {
	COM: "notSet"
}

var AvailablePorts = {};
module.exports = {
	SerialPorts : [234],

	newDevice: function(comport,baudRate){
		Device.COM = comport;
		
		if(!AvailablePorts[comport]) {
			AvailablePorts[comport] = {};
		}
		AvailablePorts[comport].baudRate = baudRate;
	},

	getDevice: function(){
		return AvailablePorts[Device.COM];
	},

	enumeratePorts: function(ports, baudRate){
		this.SerialPorts = JSON.parse(JSON.stringify(ports));

		ports.forEach(function(port){

			if(!AvailablePorts[port.comName]) {
				AvailablePorts[port.comName] = {};
			}
			
			AvailablePorts[port.comName].comName = port.comName;
			AvailablePorts[port.comName].manufacturer = port.manufacturer;
			AvailablePorts[port.comName].serialNumber = port.serialNumber;
			AvailablePorts[port.comName].pnpId = port.pnpId;
			AvailablePorts[port.comName].locationId = port.locationId;
			AvailablePorts[port.comName].vendorId = port.vendorId;
			AvailablePorts[port.comName].productId = port.productId;
			AvailablePorts[port.comName].baudRate = baudRate;
		});
	},

	getPorts: function(){
		return this.SerialPorts;
	}
}