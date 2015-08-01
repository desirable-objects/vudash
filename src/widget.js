var Joi = require('joi'),
    shortid = require('shortid');

    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$');

var schema = Joi.object().keys({
  extends: Joi.string().optional(),
  dimensions: Joi.object().required().keys({
    height: Joi.number().required(),
    width: Joi.number().required()
  }),
  template: Joi.object().required().keys({
    html: Joi.string().required(),
    css: Joi.string().optional(),
    model: Joi.object().optional()
  }),
  job: Joi.object().required().keys({
    schedule: Joi.number().optional().min(1000),
    script: Joi.func().optional()
  })
}).or('extends', 'dimensions')
.or('extends', 'dimensions')
.or('extends', 'template')
.or('extends', 'job');

var Widget = function(options, socket) {

  var sch;

  Joi.validate(options, schema, function(err, validated) {

    if (err) {
      console.error('Problem building widget:');
      throw err;
    }

    sch = validated;
    sch.id = '_'+shortid.generate();
    sch.runner = setInterval(function() {

      function emit(data) {
        try {
          socket.emit(sch.id, data);
        } catch (e) {
          console.error(sch.id, 'tried to broadcast, but no client was connected');
        }
      }

      sch.job.script(emit, sch);

    }, sch.job.schedule);

  });

  return sch;
};

module.exports = Widget;
