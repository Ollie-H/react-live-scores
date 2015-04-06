var Leagues = React.createClass({
	loadLeagues: function() {
		$.ajax({
			url: config.LEAGUES_URL,
			dataType: 'json',
			success: function(data) {
				var leagues = _.filter(data.League, function(league){
					return league.Name.toString().indexOf('English') > -1;
				});
				this.setState({ leagues: leagues});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(arguments);
			}
		});
	},
	getInitialState: function() {
		return {leagues: []};
	},
	componentDidMount: function() {
		window.setTimeout(this.loadLeagues(), 100);
	},
	render: function() {
		return (
			<div>
				<select className="form-control" onChange={this.handleChange} ref="leaguesDropdown">
					{
						this.state.leagues.map(function(league){
							return <option value={league.Id}>{league.Name}</option>
						}, this)
					}
				</select>
			</div>
		);
	},
	handleChange: function(e){
		this.props.onChange($(e.target).val());
	}
});

module.exports = Leagues;