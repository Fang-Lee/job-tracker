import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOpps } from '../../actions';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

const tableCols = [
	{ label: 'Company', value: 'company' },
	{ label: 'Job Title', value: 'jobTitle' },
	{ label: 'Status', value: 'status' },
	{ label: 'Last Contact', value: 'lastContact' },
	{ label: 'Priority', value: 'priority' },
	{ label: 'Application Link', value: 'appLink' }
];

class OppTable extends Component {
	componentWillMount() {
		this.props.fetchOpps();
	}
	renderTableHeaders() {
		const headers = tableCols.map(col => (
			<TableHeaderColumn key={col.value} style={styles.tableHeaders}>
				{col.label}
			</TableHeaderColumn>
		));
		headers.push(
			<TableHeaderColumn key="action" style={styles.tableHeaders}>
				Actions
			</TableHeaderColumn>
		);
		return headers;
	}
	renderTableContent(opp) {
		const cols = tableCols.map(col => {
			console.log(opp)
			return <TableRowColumn key={opp._id}>{opp[col.value]}</TableRowColumn>
		}
		);
		cols.push(<TableRowColumn>EDIT</TableRowColumn>);
		return cols;
	}
	renderTableRows() {
		return this.props.opps
			.reverse()
			.map(opp => <TableRow key={opp._id}>{this.renderTableContent(opp)}</TableRow>);
	}

	render() {
		console.log(this.props.opps);
		return (
			<Table>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>{this.renderTableHeaders()}</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false} showRowHover>{this.renderTableRows()}</TableBody>
			</Table>
		);
	}
}

/** Styling **/
const styles = {
	tableHeaders: {
		fontSize: '0.9em'
	}
};

/*************/

function mapStateToProps({ opps }) {
	return { opps };
}

export default connect(mapStateToProps, { fetchOpps })(OppTable);
