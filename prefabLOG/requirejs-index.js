var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['log4js'],
function   (log4js) {
    //foo and bar are loaded according to requirejs
    //config, but if not found, then node's require
    //is used to load the module.
	console.log("in prefabLOG");
	
	log4js.configure({
		appenders : [ {
			type : 'console'
		}, {
			type : 'file',
			filename : 'app.log',
			category : 'app'
		} ],
		// from log4js 0.5 onwards you'll need to explicitly enable replacement of
		// node's console.log functions
		replaceConsole : true
	});

	var logger = log4js.getLogger('app');
	logger.setLevel('TRACE');

/*	logger.trace('trace test from ps-log4js.js');
	logger.debug('debug test from ps-log4js.js');
	logger.info('info test from ps-log4js.js');
	logger.warn('warn test from ps-log4js.js');
	logger.error('error test from ps-log4js.js');
	logger.fatal('fatal test from ps-log4js.js');
	console.log('console log test');
	console.warn('console warn test');*/

	function trace(message){logger.trace(message);}
	function debug(message){logger.debug(message);}
	function info(message){logger.info(message);}
	function warn(message){logger.warn(message);}
	function fatal(message){logger.fatal(message);}

	exports.trace = trace;
	exports.debug = debug;
	exports.info = info;
	exports.warn = warn;
	exports.fatal = fatal;

	logger.debug("log4js initialized");
});

var extend = require("xtend");

module.exports = function(options){
    return {
        var defaults = {
        	logglyConfig: {
        		subdomain: "prefabsoft",
        		auth: {
        			username: "jochen",
        			password: "l0ggly"
        		},
        		json: true
        	}
        };
        
        var settings = extend(defaults, options);
        
        var logglyClient = loggly.createClient(settings.logglyConfig);
        var logglyInput = logglyClient.getInput('node-loggly');
        
        logglyInput.log('127.0.0.1 - Theres no place like home');
        
        
/*        logglyClient.getInput('node-loggly', function (err, input) {
        	input.log('127.0.0.1 - Theres no place like home');
    	});*/
    };
};
