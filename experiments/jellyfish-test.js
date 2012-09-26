var jellyfish = require('jellyfish'),
	assert = require('assert');

var browser = jellyfish.createFirefox();

browser.go("http://www.jelly.io");

/*browser.go("http://www.jelly.io").js("document.title", function(o) {
	assert.equal(o.result, "Jelly.io: Jellyfish Home");
}).jsfile("./test.js", function(o) {
	assert.equal(o.result, "alerted: Jellyfish local file loaded successfully!");
}).jsurl("http://jelly.io/test.js", function(o) { 
	assert.equal(o.result,"alerted: Jellyfish remote file loaded successfully!");
	browser.stop(function() {
		setTimeout(process.exit, 2000);
	});
});*/