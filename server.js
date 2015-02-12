var express = require("express");
var speakeasy = require('speakeasy');

var app = express();

var generated = speakeasy.generate_key({length: 20, google_auth_qr: true, name: "myCoolTestSite"});
console.log(generated);

app.use('/', function (req, res) {
  var code = speakeasy.time({key: generated.base32, encoding: 'base32'});
  console.log(code);
  
  var html = buildHtml(generated.google_auth_qr, code);
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': html.length,
    'Expires': new Date().toUTCString()
  });
  res.end(html);
  
});

function buildHtml(chartUrl, secret) {
  var header = '';
  var body = '<div><img style="-webkit-user-select: none" src="' + chartUrl + '"></div><div> Code: ' + secret + '</div>';
  
  return '<!DOCTYPE html>'
       + '<html><header>' + header + '</header><body>' + body + '</body></html>';
};

app.listen(3000, function () {
    console.log("Working on port 3000");
});