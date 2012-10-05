var shoe = require('shoe');
var http = require('http');

var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(ecstatic);
server.listen(9999);

var sock = shoe(function (stream) {
    var iv = setInterval(function () {
        stream.write(Math.floor(Math.random() * 2));
    }, 250);

    stream.on('end', function () {
        clearInterval(iv);
    });
    
    stream.on('log', function (msg) {
        console.log(msg);
    });

    stream.pipe(process.stdout, { end : false });
});
sock.install(server, '/invert');