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

    function loadWidget(name) {
      return require(Path.join(__dirname, '..', 'widgets', `${name}.widget.js`));
    }

    _.each(files, function(widget) {

      if (_.endsWith(widget, '.widget.js')) {

        var name = widget.split('\.')[0];
        var options = loadWidget(name);

        if (options.extends) {
          var base = loadWidget(options.extends);
          options = _.defaultsDeep(options, base);
        }

        widgets[name] = new Widget(name, options, ws);

      }
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
