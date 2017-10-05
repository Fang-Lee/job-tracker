import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import OppTable from './OppTable';

import { white, grey800 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends Component {
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
			</div>
		);
	}
}

export default Dashboard;
