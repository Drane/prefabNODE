var requirejs = require('requirejs');

requirejs.config({
	//Use node's special variable __dirname to
    //get the directory containing this file.
    //Useful if building a library that will
    //be used in node but does not require the
    //use of node outside
    baseUrl: __dirname,
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['prefabLOG', 'prefabLIB', 'seaport','express', 'http','./routes', './routes/user', 'module','path'],
		function(log, prefabLIB, seaport,express, http, routes, user, module, path) {
			// foo and bar are loaded according to requirejs
			// config, but if not found, then node's require
			// is used to load the module.
			log.debug("in prefabWEBADMIN app");
			
			/*prefabLIB.runSeaport(function(){
				var ports = seaport.connect('localhost', 9090);
				ports.service('prefabWEBADMIN@0.0.0', function (port, ready) {*/
			var port = 6666;
					log.debug("received port: "+port);
					
					var app = express();

					app.configure(function(){
					  app.set(port, process.env.PORT || 3000);
					  app.set('views', __dirname + '/views');
					  app.set('view engine', 'jade');
					  app.use(express.favicon());
					  app.use(express.logger('dev'));
					  app.use(express.bodyParser());
					  app.use(express.methodOverride());
					  app.use(app.router);
					  app.use(require('stylus').middleware(__dirname + '/public'));
					  app.use(express.static(path.join(__dirname, 'public')));
					});

					app.configure('development', function(){
					  app.use(express.errorHandler());
					});

//					app.get('/', routes.index);
//					app.get('/users', user.list);
					app.get('/', function(req, res){
						  res.send('Hello World');
						});

					http.createServer(app).listen(port, function(){
					  console.log("Express server listening on port " + port);
					});
/*				});
			});*/
		});