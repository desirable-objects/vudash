var Path = require('path'),
    fs = require('fs'),
    _ = require('lodash-node'),
    Widget = require('./widget');

var WidgetLoader = function(server) {
  this.ws = server.plugins.websocket.socket;
  this.widgets = {};
}

WidgetLoader.prototype._loadDefinition = function(name) {
  return require(Path.join(__dirname, '..', 'widgets', `${name}.widget.js`));
}

WidgetLoader.prototype.load = function(name) {

  if (this.widgets[name]) {
    return this.widgets[name];
  }

  var options = this._loadDefinition(name);

  if (options.extends) {
    var base = this._loadDefinition(options.extends);
    options = _.defaultsDeep(options, base);
  }

  this.widgets[name] = new Widget(name, options, this.ws);
  return this.widgets[name];

}

var register = function (server, options, next) {

  console.log('Registering widget loader.');

  var widgetLoader = new WidgetLoader(server);

  server.expose('loader', widgetLoader);
  return next();

};

register.attributes = {
  name: 'widgets',
  version: '1.0.0'
};

module.exports = register;
