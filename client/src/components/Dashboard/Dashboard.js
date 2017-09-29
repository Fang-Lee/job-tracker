import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

import { grey800 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';

const tableHeaders = [
	'Company',
	'Job Title',
	'Status',
	'Last Contact',
	'Priority',
	'Application Link',
	'Actions'
];

class Dashboard extends Component {
	renderTableHeaders() {
		return tableHeaders.map(header => (
			<TableHeaderColumn style={styles.tableHeaders}>
				{header}
			</TableHeaderColumn>
		));
	}
	render() {
		return (
			<div>
				<div className="dashboard-header">
					<h1>My Opportunities</h1>
					<RaisedButton
						containerElement={<Link to="/new" />}
						linkButton={true}
						label="Add an opportunity"
						backgroundColor={grey800}
						labelColor="white"
					/>
				</div>
				<Table>
					<TableHeader displaySelectAll={false} adjustForCheckbox={true}>
						<TableRow>{this.renderTableHeaders()}</TableRow>
					</TableHeader>
				</Table>
			</div>
		);
	}
}

/** Styling **/
const styles = {
	raisedButton: {
		backgroundColor: grey800
	},
	tableHeaders: {
		fontSize: '0.9em'
	}
};

/*************/

export default Dashboard;
