window.$ = require('./vendor/jquery');
window._ = require('./vendor/underscore');
window.React = window.React = require('./vendor/react');
window.config = require('./config/config');
var App = require('./components/app.jsx');;

$(document).ready(function(){   
  
  React.render(
    <App />, 
    document.getElementById('app')
  );    

});   