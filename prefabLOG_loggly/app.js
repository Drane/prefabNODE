var loggly = require("./index")({fireAndForget: true});

console.log("pre log test");
loggly.log({boolean: true, string: "test"});
console.log("post log test");