var request = require('request'),
    cheerio = require('cheerio');

module.exports = {
  dimensions: {
    rows: 1.5,
    columns: 2
  },
  template: {
    html: `
      <h3>Contentful API</h3>
      <dl class="api-status" data-query="each(components)">
        <dt class="api-status--component">{{component}}</dt>
        <dd class="api-status--status">{{status}}</dd>
      </dl>
    `,
    css: `
      .api-status {
        font-size: 22px;
        width: 98%;
      }
      .api-status--component, .api-status--status {
          float: left;
          margin: 0;
      }
      .api-status--component {
         width: 75%;
         clear: both;
      }
      .api-status--component::after {
        content: ':'
      }
      .api-status--status {
        width: 25%;
        font-weight: bold;
        text-align: right;
      }
    `,
    model: {
      components: [{component: 'Content Management Status', status: 'Unknown'}]
    }
  },
  job: {
    schedule: 30000,
    script: function(emit) {

      request({
        uri: 'http://status.contentful.com'
      }, function(err, response, body) {

        var $ = cheerio.load(body);
        var healthy = $('.page-status').hasClass('status-none');
        var payload = {
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
