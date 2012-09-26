var prefabLOG_loggly;
var extend = require("xtend");
var loggly = require("loggly");

module.exports = exports = prefabLOG_loggly = function loggly_module(options){
	var defaults = {
		fireAndForget: false,
		logglyConfig: {
			subdomain: "prefabsoft",
			auth: {
				username: "prefabsoft",
				password: "l0ggly"
			},
			json: true
		}	
	};
	
	var settings = (options?extend(defaults, options):defaults);
	
	var public_methods = {};
	
	var logglyClient = loggly.createClient(settings.logglyConfig);
//	var logglyInput = logglyClient.getInput('node-loggly');
	
	var log = function(message){
		if(defaults.fireAndForget){
			logglyClient.log('f818ae73-130f-4b8e-986a-7a72ed12090d', message);
		}else{
			logglyClient.getInput('node-loggly', function (err, input) {
				if(err){
					// handle the error, or forward it to the next callback
					console.log(err);
					return;
				}
				input.log(message);
			});
		}
	};
	
	public_methods.log = log;
	
	return public_methods;
};