var moment = require('moment');
var example = new Date();

module.exports = {
  dimensions: {
    rows: 1,
    columns: 1
  },
  template: {
    html: `
    <h3>Last Deployment</h3>
    <span class="last-deployment__when">{{when}}</span>
    `,
    css: '.last-deployment__when, { display: block; font-size: 40px; }',
    model: {
      when: example,
    }
  },
  job: {
    schedule: 1000,
    script: function(emit) {
      emit({
        when: moment(example).fromNow()
      });
    }
  }
}
