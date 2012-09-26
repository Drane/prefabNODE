var module_with_parameters;
var extend = require("xtend");

module.exports = exports = module_with_parameters = function template_module(options){
	var defaults = {
			
	};
	
	var settings = (options?extend(defaults, options):defaults);
	
	var public_methods = {};
	
	function log(){
		console.log('ok');
	}
	
	public_methods.log = log;
	
	return public_methods;
};