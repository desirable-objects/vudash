var Joi = require('joi');

var schema = Joi.object().keys({
  extends: Joi.string().optional(),
  dimensions: Joi.object().required().keys({
    height: Joi.number().required(),
    width: Joi.number().required()
  }),
  template: Joi.object().required().keys({
    html: Joi.string().required(),
    css: Joi.string().required()
  }),
  job: Joi.object().required().keys({
    schedule: Joi.number().min(1000),
    script: Joi.func()
  })
}).or('extends', 'dimensions')
.or('extends', 'dimensions')
.or('extends', 'template')
.or('extends', 'job');

var Widget = function(options) {

  var sch;

  Joi.validate(options, schema, function(err, validated) {

    if (err) {
      console.error('Problem building widget:');
      throw err;
    }

    sch = validated;

  });

  return sch;
};

module.exports = Widget;
