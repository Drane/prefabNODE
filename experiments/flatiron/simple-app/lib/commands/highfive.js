// cmd/highfive.js
var highfive = module.exports = function highfive (person, cb) {
  this.log.info('High five to ' + person + '!');
  cb(null);
};