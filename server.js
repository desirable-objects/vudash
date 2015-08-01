var Hapi = require('hapi'),
Path = require('path');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: process.env.PORT || 8000
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: Path.join(__dirname, 'views'),
  layoutPath: Path.join(__dirname, 'views/layouts'),
  layout: true
});

server.route({
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: './node_modules',
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
});

server.start();
