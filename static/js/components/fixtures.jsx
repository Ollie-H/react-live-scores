var Fixtures = React.createClass({
	api: function(url, callback) {
		$.ajax({
			url: url+"/"+this.props.leagueId,
			dataType: 'json',
			success: function(data) {
				callback.call(this, data);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(arguments);
			}
		});
 	},
	getInitialState: function() {
		return { leagueId: this.props.leagueId, fixtures: []};
	},
	getFixtures: function(){
		this.api(config.FIXTURES_URL, function(data){
			this.setState({ fixtures: data.Match }, this.getLiveScores);
		});
	},
	getLiveScores: function(){

		this.api(config.LIVE_URL, function(data){

			var fixtures = [];
			var games = _.indexBy(data.Match, function(match){
				return match.Id[0];
			});
			_.each(this.state.fixtures, function(match){
				var m = match;
				if(games[match.Id]){
					m.Live = games[match.Id];
				}
				fixtures.push(m);
			});

			this.setState({ fixtures: _.sortBy(fixtures, 'Live') });

		});

		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.getLiveScores, 1000 * 20);

	},
	componentDidMount: function() {

		window.setTimeout(function(){

			this.getFixtures();

		}.bind(this), 100);

	},
	componentWillReceiveProps: function(){
		this.setState({leagueId: this.props.leagueId}, this.componentDidMount);
	},
	render: function() {
		return ( 
			<div className="panel panel-default">
				<table className="table">
					<tbody>
						{
							this.state.fixtures.map(function(fixture){
								return <tr>
									<td>{fixture.HomeTeam} {(fixture.Live) ? fixture.Live.HomeGoals[0] : ''}</td>
									<td>vs</td>
									<td>{fixture.AwayTeam} {(fixture.Live) ? fixture.Live.AwayGoals[0] : ''}</td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div>
		);
	}

});

module.exports = Fixtures;