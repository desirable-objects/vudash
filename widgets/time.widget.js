var moment = require('moment'),
    React = require('react');

module.exports = {
  dimensions: {
    rows: 1,
    columns: 1
  },
  template: {
    element:
      <div>
        <span className="date">12/12/15</span>
        <span className="time">12:12:13</span>
      </div>
    ,
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
