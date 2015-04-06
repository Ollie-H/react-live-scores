//setup Dependencies
var connect = require('connect'),
    express = require('express'),
    io = require('socket.io'),
    port = (process.env.PORT || 2222),
    http = require('http'),
    xml2js = require('xml2js'),
    fs = require('fs'),
    parser = new xml2js.Parser(),
    dateFormat = require('dateformat');

var API_KEY = 'WZIYHCMDQIQBMTBOGOZYMCOGOWCXPPMHMIAELCTNMWWVPCVTWC';
var TODAY = new Date;

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

var apiCall = function(filename, url, response){
    http.get(url+'&ApiKey='+API_KEY, function(res) {
      var body = '';
      res.on('data', function(d) {
          body += d;
      });
      res.on('end', function() {
        parser.parseString(body, function (err, result) {
            if(result['XMLSOCCER.COM'].AccountInformation){
                fs.writeFile('cache/'+filename, JSON.stringify(result["XMLSOCCER.COM"]));
                response.send(result["XMLSOCCER.COM"]);
            }
            else{
                fs.readFile('cache/'+filename, function (err, data) {
                    response.send(JSON.parse(data));
                });
            }
        });
    });
  });

};


server.get('/', function(req,res){

    res.sendfile('index.html', {root: __dirname });

});

server.get('/api/getLeagues', function(req,response){
    
    apiCall('leagues.json', 'http://www.xmlsoccer.com/FootballData.asmx/GetAllLeagues?i=0', response);

});

server.get('/api/getFixtures/:id', function(req,response){

    apiCall('fixtures'+req.params.id+'.json', 'http://www.xmlsoccer.com/FootballData.asmx/GetFixturesByDateIntervalAndLeague?startDateString='+dateFormat(TODAY, 'mm/dd/yyyy 00:00:00')+'&endDateString='+dateFormat(TODAY, 'mm/dd/yyyy 23:00:00')+'&league='+req.params.id, response);

}); 

server.get('/api/getLiveScores/:id', function(req,response){

    apiCall('live'+req.params.id+'.json', 'http://www.xmlsoccer.com/FootballData.asmx/GetLiveScoreByLeague?league='+req.params.id, response);
    
}); 

console.log('Listening on http://0.0.0.0:' + port );