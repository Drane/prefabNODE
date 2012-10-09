var prefab;
require('prefabLOG')();
var extend = require("xtend");
var colors = require('colors');
var child_process_spawn = require('child_process').spawn;

var seaport = require('seaport');

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

module.exports = exports = prefab = function prefab_module(options){
	var defaults = {
		seaPort: 9090,
		seaPortSecret: 'drane'
	};
	
	var settings = (options?extend(defaults, options):defaults);
	
	var public_methods = {};
	
	var ports = getSeaports();
	
	init();
	
	function init(){
//		startSeaport();
	}
	
	function getSeaports(){
		startSeaportServer();
		
		var ports = seaport.connect('localhost', settings.seaPort);
		console.log("getSeaports()",ports);
		
		return ports;
	}
	
	function startSeaportServer(){
		server = seaport.createServer();
		server.on('allocate', function (alloc) {
		    console.log('--- allocated ---');
		    console.dir(alloc);
		});

		server.on('free', function (free) {
		    console.log('--- freed ---');
		    console.dir(free);
		});
		server.listen(settings.seaPort);
		console.log('Seaport server listening on port '+settings.seaPort);
	}
	
	function getPort(role, cb){
		console.log('getPort', ports);
		ports.allocate(role, function (port) {
		    console.log('allocated ' + port);
		    cb(port);
		});
		/*
		ports.get(role, function (ps) {
//		    var u = 'http://' + ps[0].host + ':' + ps[0].port;
		    if(cb)
		    	cb(ps[0].port);
		    else
		    	return ps[0].port;
//		    request(u).pipe(process.stdout);
		});*/
	}
	
	function cd(dir) {
//		console.log('Starting directory: ' + process.cwd());
		try {
			process.chdir(dir);
//			console.log('New directory: ' + process.cwd());
		} catch (err) {
			console.log('chdir: ' + err);
		}
	}
	
	function spawn(cmd, param, options, name){
		var child = child_process_spawn(cmd, param, options);
		
//		console.log(child);
//		console.log(child.stdout);
		
		child.stdout&&child.stdout.on('data', function (data) {
			if(name)
				console.log(name+': ' + data);
			else
				console.log(cmd+" "+param+" ",options+'stdout: ' + data);
		});

		child.stderr&&child.stderr.on('data', function (data) {
			if(name)
				console.error(name+': ' + data);
			else
				console.error(cmd+" "+param+" ",options+'stdout: ' + data);
		});
		
		child.on('exit', function(code) {
			console.log('Child process ',cmd+" "+param+" ",options,' exited with code:', code);
		});
		console.info("Spawned child process: \n\tcmd:",cmd+"\n\tparam:",param,"\n\toptions:",options);
		
		return child;
	}

/*	function spawnChild(cmd, param, {stdio: 'inherit'}) {
		var child = spawn(cmd, param);

		child.stdout.on('data', function(data) {
			console.log(data.toString());
		});

		child.on('exit', function(code) {
			console.log('Child process '+cmd+" "+param+' exited with code:', code);
		});
		console.info("Spawned child process: "+cmd+" "+param);
		
		return child;
	}
*/	
	public_methods.cd = cd;
	public_methods.spawn = spawn;
	public_methods.getPort = getPort;
//	public_methods.spawnChild = spawnChild;
	
	return public_methods;
};