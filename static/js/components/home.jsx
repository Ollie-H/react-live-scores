var Home = React.createClass({
	loadFixtures: function() {

		$.ajax({
			url: config.LIVE_SCORES_URL,
			dataType: 'json',
			success: function(data) {
				console.log(data);
				this.setState({ fixtures: data }); 
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(arguments); 
			}
		});
 
	},
	getInitialState: function() {
		return {fixtures: []};
	},
	componentDidMount: function() {
		window.setTimeout(this.loadFixtures(), 100);
		window.setInterval( this.loadFixtures, 1000*20 );
	},
	render: function() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Scottish League Fixtures</div>
				<table className="table">
					<tbody>
						{
							this.state.fixtures.map(function(fixture){
								return <tr>
									<td>{fixture.HomeTeam}</td>
									<td>vs</td>
									<td>{fixture.AwayTeam}</td>
								</tr>
							})
						}
					</tbody>
				</table>
			</div>
		);
	}

});

module.exports = Home;