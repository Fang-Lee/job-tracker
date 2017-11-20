import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import OppTable from './OppTable';

import { white, grey800 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class Dashboard extends Component {
	state = { snackbarOpen: true, snackbarMessage: "Successfully deleted opportunity" };
	handleSnackbarClose = () => {
		this.setState({
			snackbarOpen: false
		});
	};
	render() {
		return (
			<div>
				<div className="dashboard-header">
					<h1>My Opportunities</h1>
					<RaisedButton
						containerElement={<Link to="/new" />}
						label="Add an opportunity"
						backgroundColor={grey800}
						labelColor={white}
					/>
				</div>
				<OppTable />
				{this.props.location.state ? (
					this.props.location.state.snackbarOpen ? (
						<Snackbar
							open={this.state.snackbarOpen && this.props.location.state.snackbarOpen}
							message={this.state.snackbarMessage}
							autoHideDuration={3000}
							onRequestClose={this.handleSnackbarClose}
						/>
					) : (
						''
					)
				) : (
					''
				)}
			</div>
		);
	}
}

export default Dashboard;
