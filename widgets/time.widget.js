var moment = require('moment');

module.exports = {
  dimensions: {
    height: 25,
    width: 25
  },
  template: {
    html: '<div class="test">{{time}}</div>',
    css: '.test { font-size: 30px; }',
    model: {
      time: new Date()
    }
  },
  job: {
    schedule: 1000,
    script: function(emit) {
      emit({time: moment().format('MMMM Do YYYY, h:mm:ss a').toString()});
    }
  }
}
