var Joi = require('joi'),
    Path = require('path'),
    fs = require('fs'),
    shortid = require('shortid'),
    _ = require('lodash-node');
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$');

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var Widget = function(name, options, socket) {

  var sch;

  Joi.validate(options, schema, function(err, validated) {

    if (err) {
      console.error('Problem building widget:');
      throw err;
    }

    sch = validated;
    sch.id = '_'+shortid.generate();

    var component = React.createClass({
      render: function() {
        return sch.template.element
      }
    });

    sch.component = ReactDOMServer.renderToStaticMarkup(React.createElement(component));

    function emit(data) {
      try {
        socket.emit(sch.id, data);
      } catch (e) {
        console.log(e);
        console.error(sch.id, 'tried to broadcast, but no client was connected');
      }
    }

    function execute() {
      try {
        sch.job.script(emit, sch);
      } catch (e) {
        console.error(`Widget ${name}(${sch.id}) caused an error during update job.`, e);
      }
    }

    execute();

    sch.runner = setInterval(execute, sch.job.schedule);

  });

  return sch;
};

module.exports = Widget;
