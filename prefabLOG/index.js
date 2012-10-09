var prefabLOG;
var extend = require("xtend");
var log4js = require("log4js");
var loggly = require("prefabLOG-loggly");

module.exports = exports = prefabLOG = function prefabLOG_module(options){
	var defaults = {
		clearConsoleOnLoad: false,
		testLogging: false,
		logglyConfig: {
    		subdomain: "prefabsoft",
    		auth: {
    			username: "jochen",
    			password: "l0ggly"
    		},
    		json: true
		}
	};
	
	var settings = (options?extend(defaults, options):defaults);
	
	var public_methods = {};
	
	console.log("pre-clear");
	
	if(settings.clearConsoleOnLoad)
		console.log('\033[2J');
	console.log("post-clear");
	
	console.log("in prefabLOG");
	
	/* via prefabLOG_loggly implementeren!
	var logglyClient = loggly.createClient(settings.logglyConfig);
    var logglyInput = logglyClient.getInput('node-loggly');
    logglyInput.log('127.0.0.1 - Theres no place like home');*/
    
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
	
	if(settings.testLogging){
		logger.trace('trace test from ps-log4js.js');
		logger.debug('debug test from ps-log4js.js');
		logger.info('info test from ps-log4js.js');
		logger.warn('warn test from ps-log4js.js');
		logger.error('error test from ps-log4js.js');
		logger.fatal('fatal test from ps-log4js.js');
		console.log('console log test');
		console.warn('console warn test');
	}

	function trace(message){logger.trace(message);}
	function debug(message){logger.debug(message);}
	function info(message){logger.info(message);}
	function warn(message){logger.warn(message);}
	function fatal(message){logger.fatal(message);}

	logger.debug("log4js initialized");
	
	public_methods.trace = trace;
	public_methods.debug = debug;
	public_methods.info = info;
	public_methods.warn = warn;
	public_methods.fatal = fatal;
	
	return public_methods;
};
