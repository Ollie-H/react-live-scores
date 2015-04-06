var Leagues = require('./leagues.jsx');
var Fixtures = require('./fixtures.jsx');

var App = React.createClass({
	getInitialState: function() {
		// By Default set to EPL, ID 1
		return {leagueId: 2};
	},
	render: function() {
		return (
			<div>
				<Leagues onChange={this.handleChange} />
				<Fixtures leagueId={this.state.leagueId} />
			</div>
		);
	},
	handleChange: function(leagueId, callback){
		this.setState({'leagueId': leagueId }, function(){
			this.render();
		}.bind(this));
	}
});

module.exports = App; 