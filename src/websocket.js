var io = require('socket.io')(8011);

var WS = function() {
}

WS.prototype.setSocket = function(socket) {
  this.socket = socket;
}

WS.prototype.emit = function(id, data) {

  if (!this.socket) {
    console.error('Cannot broadcast to widget ', id, '. Not connected');
    return;
  }

  this.socket.emit(id, data);
}

var register = function (server, options, next) {

  var ws = new WS();

  console.log('Registering websocket.');

  io.on('connection', function (socket) {

    ws.setSocket(socket);
    console.log('Client connected!');

    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

  server.expose('socket', ws);

  return next();

};

register.attributes = {
  name: 'websocket',
  version: '1.0.0'
};

module.exports = register;
