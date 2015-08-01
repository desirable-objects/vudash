var Path = require('path'),
    fs = require('fs'),
    _ = require('lodash-node'),
    Widget = require('./widget');

var register = function (server, options, next) {

  console.log('Registering widget loader.');

  var widgets = {};

  fs.readdir('./widgets', function(err, files) {
    if (err) {
      console.error(err);
    }

    var ws = server.plugins.websocket.socket;

    _.each(files, function(widget) {
      var name = widget.split('\.')[0];
      var options = require(Path.join(__dirname, '..', 'widgets', widget));
      widgets[name] = new Widget(options, ws);
    });

    server.expose('available', widgets);
    return next();

  });

};

register.attributes = {
  name: 'widgets',
  version: '1.0.0'
};

module.exports = register;
