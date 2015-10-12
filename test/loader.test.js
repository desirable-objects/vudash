require("babel/register");
var Code = require('code');
var expect = Code.expect;

describe('Loader', function() {

  var server = {
    plugins: {websocket: {}},
    expose: function(key, plugin) {
      this.plugins.key = plugin;
    }
  };

  beforeEach(function(done) {
        var Plugin = require('../src/loader');
        Plugin(server, {}, done);
  });

  it('Loads plugin', function(done) {

    expect(server.plugins).to.exist();
    done();

  });

});
