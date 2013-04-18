var fs = require('fs');

var infiles = [
	{file: './honda/Engine RPM.txt', event: 'rpm', field: 'rpm'},
	{file: './honda/Throttle position.txt', event: 'throttle', field: 'percent'},
	{file: './honda/Vehicle speed.txt', event: 'speed', field: 'mph'},
	{file: './honda/Power.txt', event: 'power', field: 'hp'},
	{file: './honda/Torque.txt', event: 'torque', field: 'lbft'}
];	

var output = [];
var datare = /^([0-9.]+)\s+([0-9.]+)/;

infiles.forEach(function(infile) {
	var file = fs.readFileSync(infile.file).toString().split("\n");
	file.forEach(function(line) {
		var data = datare.exec(line);
		if (data) {
			output.push({
				time: Math.floor(data[1]*1e9),
				event: infile.event,
				field: infile.field,
				value: Math.floor(data[2])
			});
		}
	});
});

output.sort(function(a,b) {
	return a.time - b.time;
});

output.forEach(function(e) {
	console.log("%d;%s;0;%s=%d", e.time, e.event, e.field, e.value);
});