define(['prefabLOG', 'express', 'jade', 'stylus','./routes', './routes/user', 'path'],
		function(log, express, jade, stylus, routes, user, path) {
			// foo and bar are loaded according to requirejs
			// config, but if not found, then node's require
			// is used to load the module.
			log.debug("in prefabWEBADMIN app");

			var app = express();

			app.configure(function() {
				app.set('views', __dirname + '/views');
				app.set('view engine', 'jade');
				app.use(express.favicon());
				app.use(express.logger('dev'));
				app.use(express.bodyParser());
				app.use(express.methodOverride());
				app.use(app.router);
				app.use(require('stylus').middleware(__dirname + '/public'));
				app.use(express.static(path.join(__dirname, 'public')));

				app.use(logErrors);
			});

			function logErrors(err, req, res, next) {
				console.error(err.stack);
				next(err);
			}

			app.configure('development', function() {
				app.use(express.errorHandler());
			});

			app.get('/', routes.index);
			app.get('/users', user.list);

			return app;

		});