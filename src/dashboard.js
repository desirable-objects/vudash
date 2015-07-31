var Joi = require('joi'),
    _  = require('lodash-node');

var schema = Joi.array().items(Joi.object().keys({
  widget: Joi.string().required()
}));

var Dashboard = function(options, available) {

  var dashboard = {
    widgets: []
  };

  Joi.validate(options, schema, function(err, validated) {

    if (err) {
      console.error('Problem building dashboard:');
      throw err;
    }

    _.each(validated, function(definition) {

      var widget = available[definition.widget];

      dashboard.widgets.push(widget);
    });

  });

  return dashboard;

};

module.exports = Dashboard;
