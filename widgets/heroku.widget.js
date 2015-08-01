module.exports = {
  dimensions: {
    rows: 1.2,
    columns: 2
  },
  template: {
    html: `
    <div class="heroku-status">
      <h3>Heroku API</h3>
      <div class="heroku-status__ring" data-query="css('border-color', production)">
        <p class="heroku-status__ring--text">Production</p>
      </div>
      <div class="heroku-status__ring" data-query="css('border-color', development)">
        <p class="heroku-status__ring--text">Development</p>
      </div>
      <small class="heroku-status__last-updated" data-last-updated="{{lastUpdated}}"></small>
    </div>
    `,
    css: `
    .heroku-status__ring {
      transition: border-color 0.5s ease;
      margin: 30px 40px;
      height: 140px;
      width: 140px;
      background-color: inherit;
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      border-radius: 70px;
      border: 3px solid green;
      display: inline-block;
    }
    .heroku-status__ring--text {
      color: #fff;
      font-size:20px;
      text-align:center;
      line-height:90px;
    }
    .heroku-status__last-updated {
      clear: both;
      display: block;
      text-align: center;
    }
    `,
    model: {
      production: 'yellow',
      development: 'yellow'
    }
  },
  job: {
    schedule: 1000 * 30,
    script: function(emit, widget) {

      var request = require('request');

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      request({
        uri: 'https://status.heroku.com/api/v3/current-status'
      }, function(err, response, body) {

        if (err) {
          console.error(err);
          return;
        }

        var state = JSON.parse(body);

        emit({
          production: state.status.Production,
          development: state.status.Development,
        });

      })

    }
  }
}
