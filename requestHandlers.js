var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(res) {
	console.log("request handler start was called")
	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" '+
	'content="text/html; charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data" '+
	'method="post">'+
	'<input type="file" name="upload" multiple="multiple">'+
	'<input type="submit" value="Upload file" />'+
	'</form>'+
	'</body>'+
	'</html>';
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(body);
	res.end();
}

function upload(res, req) {
	console.log("request handler upload was called");

	var form = formidable.IncomingForm();
	form.uploadDir = "D:/w";
	form.parse(req, function(error, fields, files) {
		console.log("parseing done");
		console.log(files.upload.path);
		fs.rename(files.upload.path, "/tmp/test.png", function(err) {
			if (err) {
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path,"/tmp/test.png");
			}
		});

		res.writeHead(200, {"Content-Type": "text/html"});
		res.write("received image:<br/>");
		res.write("<img src='/show'>");
		res.end();
	})
}

function show(res) {
	console.log("request handler show was called");
	res.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;