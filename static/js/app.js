var $ = window.$ = require('./vendor/jquery');
var _  = window._ = require('./vendor/underscore');
var React = window.React = window.React = require('react');
var config = window.config = require('./config/config');
var Home = require('./components/home.jsx');

React.render(<Home />, document.body);        