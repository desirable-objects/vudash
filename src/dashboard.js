var Joi = require('joi'),
    _  = require('lodash-node');

var schema = Joi.object().keys({
  layout: Joi.object().required().keys({
    gutter: Joi.number().optional().default(6),
    height: Joi.number().required(),
    width: Joi.number().required(),
    rows: Joi.number().required(),
    columns: Joi.number().required()
  }),
  css: Joi.string().optional(),
  widgets: Joi.array().items(
    Joi.string()
  )
});

var Dashboard = function(options, loader) {

  var dashboard = {
    widgets: []
  };

  Joi.validate(options, schema, function(err, validated) {

    if (err) {
      console.error('Problem building dashboard:');
      throw err;
    }

    dashboard.layout = validated.layout;
    dashboard.css = validated.css;

    _.each(validated.widgets, function(name) {
      var widget = loader.load(name);

      if (widget) {
        dashboard.widgets.push(widget);
      } else {
        console.error('Widget specified in dashboard, but was not available', definition);
      }

    });

  });

  return dashboard;

};

module.exports = Dashboard;
