var Cache = function() {
  this.history = {
    when: null,
    cached: null
  };
};

Cache.prototype.expired = function() {
  if (!this.history.when) { return true; }
  return this.history.when < Date.now();
};

Cache.prototype.set = function(contents) {
  let date = new Date();
  this.history = {
    when: new Date(date.getTime() + 1000 * 60000),
    cached: contents
  };
};

Cache.prototype.get = function() {
  return this.history.cached;
};

var cache = new Cache();

module.exports = {
  dimensions: {
    rows: 1.2,
    columns: 1
  },
  template: {
    html: `
    <h3>Twitter mentions for Dashboard</h3>
    <span class="twitter-mentions">{{mention}}</span>
    `,
    css: `
    .twitter-mentions {
      font-size: 22px;
      width: 70%;
      display: block;
      margin: auto;
    }
    `,
    model: {
      mention: 'Loading...'
    }
  },
  job: {
    schedule: 1000 * 5,
    script: function(emit, widget) {

      var request = require('request');

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      function emitRandom() {
          var tweets = cache.get(),
              random = Math.ceil(Math.random() * (tweets.length - 1));
          emit({mention: tweets[random].property1.text});
      }

      if (cache.expired()) {
        request({
          uri: 'https://www.kimonolabs.com/api/6z9f8v1k?apikey=6337589e7b5fbec410ffe668db625218'
        }, function(err, response, body) {

          if (err) {
            console.error(err);
            return;
          }

          var tweets = JSON.parse(body).results.collection1;

          cache.set(tweets);
          emitRandom();
        })
      } else {
        emitRandom();
      }

    }
  }
}
