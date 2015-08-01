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
  widgets: Joi.array().items(
    Joi.object().keys({
      widget: Joi.string().required()
    })
  )
});

var Dashboard = function(options, available) {

  var dashboard = {
    widgets: []
  };

  Joi.validate(options, schema, function(err, validated) {

    if (err) {
      console.error('Problem building dashboard:');
      throw err;
    }

    dashboard.layout = validated.layout;

    _.each(validated.widgets, function(definition) {
      var widget = available[definition.widget];

      if (widget) {
        dashboard.widgets.push(widget);
      } else {
        console.error('Widget specified in dashboard, but was not available', definition.widget);
      }

    });

  });

  return dashboard;

};

module.exports = Dashboard;
