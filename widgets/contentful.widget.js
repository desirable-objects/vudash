module.exports = {
  dimensions: {
    rows: 1.2,
    columns: 2
  },
  template: {
    html: `
      <div class="api-status">
        <h3>{{name}} API</h3>
        <dl class="api-status__list" data-query="each(components)">
          <dt class="api-status__list--component">{{component}}</dt>
          <dd class="api-status__list--status">{{status}}</dd>
        </dl>
        <small class="api-status__last-updated" data-last-updated="{{lastUpdated}}"></small>
      </div>
    `,
    css: `
      .api-status__list {
        font-size: 22px;
        width: 98%;
        display: block;
        clear: right;
      }
      .api-status__list--component, .api-status__list--status {
          float: left;
          margin: 0;
      }
      .api-status__list--component {
         width: 75%;
         clear: both;
      }
      .api-status__list--component::after {
        content: ':'
      }
      .api-status__list--status {
        width: 25%;
        font-weight: bold;
        text-align: right;
      }
      .api-status__last-updated {
        clear: left;
        display: block;
        padding-top: 20px;
      }
    `,
    model: {
      name: 'Unknown',
      components: [{component: 'API Status', status: 'Waiting...'}]
    }
  },
  job: {
    schedule: 1000 * 30,
    variables: {
      name: 'Contentful',
      uri: 'http://status.contentful.com'
    },
    script: function(emit, widget) {

      var request = require('request'),
      cheerio = require('cheerio'),
      moment = require('moment');

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      request({
        uri: widget.job.variables.uri
      }, function(err, response, body) {

        if (err) {
          console.error(err);
          return;
        }

        var $ = cheerio.load(body);
        var healthy = $('.page-status').hasClass('status-none');
        var payload = {
          name: widget.job.variables.name,
          background: healthy ? 'green' : 'red',
          components: []
        };

        $('.component-inner-container').each(function(index, component) {
          var component = $(component);
          payload.components.push({
            component: component.find('.name').text().replace('\?', '').trim(),
            status: component.find('.component-status').text().trim()
          });
        });

        emit(payload);

      })

    }
  }
}
