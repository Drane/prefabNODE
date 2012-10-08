//var spawn = require('child_process').spawn
//  , ls = spawn('fleet', ['monitor']);
//
//ls.stdout.on('data', function(data) {
//  console.log(data.toString());
//});
//
//ls.on('exit', function(code) {
//  console.log('Child process exited with code:', code);
//});

var exec = require('child_process').exec;

exec('fleet monitor', function(err, stdout, stderr) {
  console.log(stdout);
});