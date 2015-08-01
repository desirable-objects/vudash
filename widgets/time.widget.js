var moment = require('moment');

module.exports = {
  dimensions: {
    rows: 1,
    columns: 1
  },
  template: {
    html: `
      <span class="date">{{date}}</span>
      <span class="time">{{time}}</span>
    `,
    css: '.date, .time { display: block; font-size: 40px; }',
    model: {
      time: new Date(),
      date: new Date()
    }
  },
  job: {
    schedule: 1000,
    script: function(emit) {
      emit({
        date: moment().format('h:mm:ss a').toString(),
        time: moment().format('MMMM Do YYYY').toString()
      });
    }
  }
}
