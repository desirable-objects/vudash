var Joi = require('joi'),
    Path = require('path'),
    fs = require('fs'),
    shortid = require('shortid'),
    _ = require('lodash-node');
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$');

var schema = Joi.object().keys({
  extends: Joi.string().optional(),
  dimensions: Joi.object().optional().keys({
    rows: Joi.number().required(),
    columns: Joi.number().required()
  }),
  template: Joi.object().optional().keys({
    html: Joi.string().required(),
    css: Joi.string().optional(),
    model: Joi.object().optional()
  }),
  job: Joi.object().optional().keys({
    schedule: Joi.number().optional().min(1000),
    variables: Joi.object().optional(),
    script: Joi.func().optional()
  })
}).or('extends', 'dimensions')
.or('extends', 'dimensions')
.or('extends', 'template')
.or('extends', 'job');

var Widget = function(name, options, socket) {

  var sch;

  Joi.validate(options, schema, function(err, validated) {

    if (err) {
      console.error('Problem building widget:');
      throw err;
    }

    sch = validated;
    sch.id = '_'+shortid.generate();

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
