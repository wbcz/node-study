var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/start"] = requestHandlers.start;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);

console.log("server was called")