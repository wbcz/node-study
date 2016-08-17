function route(handle, pathname, res, req) {
	console.log("a request for" + pathname);
	if (typeof handle[pathname] === 'function') {
		console.log(handle[pathname])
		handle[pathname](res, req);
	} else {
		console.log(3333)
		console.log("no request handler found for" + pathname);
		res.writeHead(404,{"Content-Type": "text/html"});
		res.write("404 not found");
		res.end();
	}
}

exports.route = route;