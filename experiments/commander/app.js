/**
 * Swap to using https://github.com/substack/comandante
 */

var colors = require('colors');
var prefab = require('./lib/prefab')({seaPort: 7000});
var console = require('prefabLOG')({clearConsoleOnLoad: true});

colors.setTheme({
	silly : 'rainbow',
	input : 'grey',
	verbose : 'cyan',
	prompt : 'grey',
	info : 'green',
	data : 'grey',
	help : 'cyan',
	warn : 'yellow',
	debug : 'blue',
	error : 'red'
});

//var u = 'http://' + ps[0].host + ':' + ps[0].port;

var settings = {
	secret: 'drane',
	fleetPort: prefab.getPort("testing@0.0.0")
};

console.info("1 settings.fleetPor: ",settings.fleetPort);

prefab.getPort("testing@0.0.0", function(port){
	settings.fleetPort = port;
	console.info("settings.fleetPor: ",settings.fleetPort);
	startServers();
});

function startServers(){
	prefab.cd('hub');
	var cmd = 'fleet';
	var param = ['hub', '--secret='+settings.secret, '--port='+settings.fleetPort];
	var options;// = { stdio: 'inherit' };

	var hub = prefab.spawn(cmd, param, options);
	hub.stdout&&hub.stdout.on('data', function (data) {
		console.info('fleet hub: ' + data);
	});
	hub.stderr&&hub.stderr.on('data', function (data) {
		console.error('fleet hub: ' + data);
	});

	prefab.cd('../drone0');
	var param = ['drone', '--secret='+settings.secret, '--hub=localhost:'+settings.fleetPort];
	var drone0 = prefab.spawn(cmd, param, options, 'fleet drone');
	/*drone0.stdout&&drone0.stdout.on('data', function (data) {
	  console.info('fleet drone: '.info + data);
	});
	drone0.stderr&&drone0.stderr.on('data', function (data) {
		console.error('fleet drone: '.error + data);
	});*/

	param = ['monitor', '--secret='+settings.secret, '--port='+settings.fleetPort];
	var monitor = prefab.spawn(cmd, param, options);
	monitor.stdout&&monitor.stdout.on('data', function (data) {
		console.info('fleet monitor: '.info + data);
	});
	monitor.stderr&&monitor.stderr.on('data', function (data) {
		console.error('fleet monitor: '.error + data);
	});

	//exec("fleet remote add default --hub=localhost:7001 --secret=drane", puts);

}