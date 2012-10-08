var program = require('commander');
var colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

// outputs red text
//console.log("this is an error".error);

// outputs yellow text
//console.log("this is a warning".warn);

var list = ['tobi', 'loki', 'jane', 'manny', 'luna'];

console.log('Choose the coolest pet:');
program.choose(list, function(i){
  console.log('you chose %d "%s"', i+1, list[i]);
  console.log();
  console.log('Choose the coolest pet, defaulting to loki:');
  program.choose(list, 1, function(i){
    console.log('you chose %d "%s"', i+1, list[i]);
    process.stdin.destroy();
  });
});