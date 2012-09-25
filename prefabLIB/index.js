var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['prefabLOG','colors','shelljs'],
function(log, colors, shelljs) {
    //foo and bar are loaded according to requirejs
    //config, but if not found, then node's require
    //is used to load the module.
	log.debug("in prefabLIB");

	colors.setTheme({
		childlogname: 'yellow',
		seaportchild: 'cyan',
	});

	function runSeaport(cb){
		var seaportchild = shelljs.exec('seaport 9090', {async:true, silent: true});
		seaportchild.stdout.on('data', function(data) {
			console.log("SEAPORT - ".bold.childlogname + data.seaportchild);
		});
		cb && cb();
	}
	
	exports.runSeaport = runSeaport;
});