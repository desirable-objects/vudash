var WS = function() {
  this.sockets = [];
}

WS.prototype.addSocket = function(socket) {

  var self = this;
  self.sockets.push(socket);

  console.log(`Client ${socket.id} connected! There are ${self.sockets.length} clients connected.`);

  socket.on('disconnect', function() {

    self.removeSocket.call(self, socket);
    console.log(`Client ${socket.id} disconnected. There are ${self.sockets.length} clients connected.`);

  });
}

WS.prototype.removeSocket = function(socket) {

  var idx = this.sockets.indexOf(socket);
  if (idx >= 0) {
    this.sockets.splice(idx, 1);
  }

}

WS.prototype.emit = function(id, data) {

  if (this.sockets.length < 1) {
    console.error(`Cannot broadcast to widget ${id}. No clients connected`);
    return;
  }

  data.lastUpdated = new Date().toString();
  for (var idx in this.sockets) {
    var client = this.sockets[idx];
    client.emit(id, data);
  }
}

var register = function (server, options, next) {

  var io = require('socket.io')(server.listener);
  var ws = new WS();

  console.log('Registering websocket.');

  io.on('connection', ws.addSocket.bind(ws));

  server.expose('socket', ws);

  return next();

};

register.attributes = {
  name: 'websocket',
  version: '1.0.0'
};

module.exports = register;
