var Hapi = require('hapi'),
    Path = require('path'),
    fs = require('fs'),
    realDir = Path.join(Path.dirname(fs.realpathSync(__filename)));

var server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8000
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'src', 'views'),
  layoutPath: Path.join(__dirname, 'src', 'views', 'layouts'),
  layout: true,
  helpersPath: Path.join(__dirname, 'src', 'views', 'helpers'),
});

server.route({
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: Path.join(realDir, 'node_modules'),
      listing: false
    }
  }
});

server.route({
  method: 'GET',
  path: '/static/{param*}',
  handler: {
    directory: {
      path: './static'
      listing: true
    }
  }
});

server.register([{
  register: require('./src/websocket.js')
},{
  register: require('./src/loader.js')
}, {
  register: require('./src/dashboards.js')
}], function (err) {
  if (err) {
    console.error('Failed to load plugin:', err);
  }

  server.start();
});
