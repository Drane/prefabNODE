define(['prefabLOG', 'express', 'jade', 'stylus','./routes', './routes/user', 'module','path'],
		function(log, express, jade, stylus, routes, user, module, path) {
			// foo and bar are loaded according to requirejs
			// config, but if not found, then node's require
			// is used to load the module.
			log.debug("in prefabWEBADMIN app");
			log.debug("routes:"+routes);
			log.debug("user:"+user);

			var app = express();

			app.configure(function() {
				var filename = module.uri;
				
				app.set('views', path.dirname(filename) + '/views');
				app.set('view engine', 'jade');
				app.use(express.favicon());
				app.use(express.logger('dev'));
				app.use(express.bodyParser());
				app.use(express.methodOverride());
				app.use(app.router);
				app.use(require('stylus').middleware(path.dirname(filename) + '/public'));
				app.use(express.static(path.join(path.dirname(filename), 'public')));

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