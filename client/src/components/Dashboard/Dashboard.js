import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import OppTable from './OppTable';

import { white, grey800 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class Dashboard extends Component {
	state = { snackbarDelete: true, snackbarArchive: true };
	handleDeleteSnackbarClose = () => {
		this.setState({
			snackbarDelete: false
		});
	};
	handleArchiveSnackbarClose = () => {
		this.setState({
			snackbarArchive: false
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
					this.props.location.state.snackbarArchive ? (
						<Snackbar
							open={this.state.snackbarArchive && this.props.location.state.snackbarArchive}
							message="Succesfully archived opportunity"
							autoHideDuration={3000}
							onRequestClose={this.handleArchiveSnackbarClose}
						/>
					) : (
						''
					)
				) : (
					''
				)}
				{this.props.location.state ? (
					this.props.location.state.snackbarDelete ? (
						<Snackbar
							open={this.state.snackbarDelete && this.props.location.state.snackbarDelete}
							message="Succesfully deleted opportunity"
							autoHideDuration={3000}
							onRequestClose={this.handleDeleteSnackbarClose}
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
