var http = require('http');  
var url = require('url');  
var fs = require('fs');  


function buildHtml(request, title, body) {

	  // concatenate header string
	  // concatenate body string

	  return '<!DOCTYPE html>'
	       + '<html><head><title>' + title + '</title></head><body>' + body + '</body></html>';
};

var server = http.createServer(function(request, response) {  
    var path = url.parse(request.url).pathname;  
    switch (path) {  
        case '/':  
        	
        	  var title = "Jmeter Reports";
        	  var body = '<h1> JMeter Performance Test Reports</h1> <ol type="1">';
        		  
              var files = fs.readdirSync("./reports");
              
        	  
	          for (var index in files) {
	        	  body = body + "<br>"
	        	  body = body +  '<li><a href= "/reports/' + files[index] + '/index.html">'  +files[index] + "</a></li> \n";
	 	      }
        	  
	          body = body + "</ol>"
	          
        	  var html = buildHtml(request, title, body);

	          
        	  response.writeHead(200, {
        	    'Content-Type': 'text/html',
        	    'Content-Length': html.length,
        	    'Expires': new Date().toUTCString()
        	  });
        	  response.end(html);
        	  
            break;
        default:  
            fs.readFile(__dirname + path, function(error, data) {  
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                	/*
                    response.writeHead(200, {  
                        'Content-Type': 'text/html'  
                    });  
                    */
                    response.write(data);  
                    response.end();  
                }  
            });  
            break;  
    }  
});  
server.listen(process.env.PORT || 3000);

/*
var express    = require('express')
var serveIndex = require('serve-index')

var app = express()

// Serve URLs like /ftp/thing as public/ftp/thing
// The express.static serves the file contents
// The serveIndex is this module serving the directory
app.use('/ftp', express.static('public/ftp'), serveIndex('public/ftp', {'icons': true}))

// Listen
app.listen(process.env.PORT || 3000);
*/
