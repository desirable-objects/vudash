var Path = require('path'),
    fs = require('fs'),
    _ = require('lodash-node'),
    Dashboard = require('./dashboard'),
    Joi = require('joi');

var register = function (server, options, next) {

  console.log('Registering dashboard loader.');

  var dashboardPath = Path.resolve('./dashboards'),
      dashboards = {};

  server.route({
    method: 'GET',
    path: '/{dashboard}.dashboard',
    config: {
      validate: {
        params: {
          dashboard: Joi.string().required().description('Dashboard name')
        }
      }
    },
    handler: function (request, reply) {

      var dashboard = server.plugins.dashboards.available[request.params.dashboard];

      var css = _.pluck(dashboard.widgets, 'template.css');

      var model = {
        css: css.join('\n'),
        dashboard: dashboard
      };

      reply.view('dashboard', model);
    }
  });

  fs.readdir(dashboardPath, function(err, files) {

    if (err) {
      console.error(err);
    }

    _.each(files, function(dashboard) {

      var name = dashboard.split('\.')[0];
      var options = require(Path.join(dashboardPath, dashboard));
      dashboards[name] = new Dashboard(options, server.plugins.widgets.loader);

    });

    server.expose('available', dashboards);

    return next();

  });

};

register.attributes = {
  name: 'dashboards',
  version: '1.0.0'
};

module.exports = register;
