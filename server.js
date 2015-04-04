//setup Dependencies
var connect = require('connect'),
    express = require('express'),
    io = require('socket.io'),
    port = (process.env.PORT || 2222),
    http = require('http'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser();

//Setup Express
var server = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(connect.static(__dirname + '/static'));
    server.use(server.router);
});

//setup the errors
server.error(function(err, req, res, next){
  console.log(err);
});
server.listen(port);

/* ROUTES */
 
server.get('/', function(req,res){
  res.sendfile('index.html', {root: __dirname })
});

server.get('/api/getLiveScore', function(req,response){ 

  http.get('http://www.xmlsoccer.com/FootballDataDemo.asmx/GetLiveScore?ApiKey=WZIYHCMDQIQBMTBOGOZYMCOGOWCXPPMHMIAELCTNMWWVPCVTWC', function(res) {
      var body = '';
      res.on('data', function(d) {
          body += d;
      });
      res.on('end', function() {
        parser.parseString(body, function (err, result) {
          response.send(result['XMLSOCCER.COM'].Match);
        });
      });
  });
    
}); 

console.log('Listening on http://0.0.0.0:' + port );