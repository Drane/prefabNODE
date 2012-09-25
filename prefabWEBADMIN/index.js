var requirejs = require('requirejs');

requirejs.config({
	//Use node's special variable __dirname to
    //get the directory containing this file.
    //Useful if building a library that will
    //be used in node but does not require the
    //use of node outside
    baseUrl: __dirname,
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['prefabLOG','seaport','request'],function(log, seaport, request) {
	log.debug("in prefabWEBADMIN index");
	var ports = seaport.connect(9090);
	log.debug("ports"+ports);
	ports.get('prefabWEBADMIN@0.0.0', function (ps) {
	    var u = 'http://' + ps[0].host + ':' + ps[0].port;
	    log.debug("u"+u);
	    request(u).pipe(process.stdout);
	});
});