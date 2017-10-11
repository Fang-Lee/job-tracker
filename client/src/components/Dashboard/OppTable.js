import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOpps } from "../../actions";

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from "material-ui/Table";
import TextField from "material-ui/TextField";
import Grade from "material-ui/svg-icons/action/grade";
import Info from "material-ui/svg-icons/action/info";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import LinkIcon from "material-ui/svg-icons/content/link";
import UpArrow from "material-ui/svg-icons/hardware/keyboard-arrow-up";
import DownArrow from "material-ui/svg-icons/hardware/keyboard-arrow-down";
import SearchIcon from "material-ui/svg-icons/action/search";
import { grey400, grey600 } from "material-ui/styles/colors";
import IconButton from "material-ui/IconButton";

class OppTable extends Component {
	constructor(props) {
		super(props);
		this.originalOpps = [];
		this.state = {
			tableHeaders: [
				{ label: "Company", value: "company", sortable: true, reversed: 0 },
				{
					label: "Job Title",
					value: "jobTitle",
					sortable: true,
					reversed: 0
				},
				{ label: "Status", value: "status", sortable: true, reversed: 0 },
				{
					label: "Last Update",
					value: "lastUpdate",
					sortable: false,
					reversed: 0
				},
				{ label: "Priority", value: "priority", sortable: true, reversed: 0 }
			],
			opps: [],
			tableRows: [],
			search: ""
		};
	}

	async componentDidMount() {
		await this.props.fetchOpps();
		this.originalOpps = this.props.opps;
		this.setState({ opps: this.props.opps });
		this.renderTableRows();
	}
	handleSort = (value, reversed, index) => {
		let sortedOpps = this.state.opps;
		let selectedCol = this.state.tableHeaders[index];
		sortedOpps.sort(function(a, b) {
			return a[value] > b[value] ? 1 : b[value] > a[value] ? -1 : 0;
		});
		if (reversed === 0 || reversed === 2) {
			sortedOpps = sortedOpps.reverse();
			selectedCol.reversed = 1;
		} else {
			selectedCol.reversed = 2;
		}
		if (value === "priority") {
			sortedOpps = sortedOpps.reverse();
		}
		let updatedHeaders = [
			{ label: "Company", value: "company", sortable: true, reversed: 0 },
			{
				label: "Job Title",
				value: "jobTitle",
				sortable: true,
				reversed: 0
			},
			{ label: "Status", value: "status", sortable: true, reversed: 0 },
			{
				label: "Last Update",
				value: "lastUpdate",
				sortable: false,
				reversed: 0
			},
			{ label: "Priority", value: "priority", sortable: true, reversed: 0 }
		];
		updatedHeaders[index] = selectedCol;
		this.setState({ opps: sortedOpps, tableHeaders: updatedHeaders });
		this.renderTableRows();
	};
	renderTableHeaders() {
		const headers = this.state.tableHeaders.map((col, index) => (
			<TableHeaderColumn key={index} style={styles.tableHeaders}>
				{col.sortable ? (
					<div
						onMouseUp={e => {
							this.handleSort(col.value, col.reversed, index);
						}}
						style={styles.header}
					>
						{col.label}
						{col.reversed === 1 ? (
							<UpArrow color={grey400} />
						) : col.reversed === 2 ? (
							<DownArrow color={grey400} />
						) : null}
					</div>
				) : (
					col.label
				)}
			</TableHeaderColumn>
		));
		headers.push(
			<TableHeaderColumn
				key="action"
				style={{ textAlign: "center", ...styles.tableHeaders }}
			>
				Actions
			</TableHeaderColumn>
		);
		return headers;
	}
	renderStars(num) {
		const stars = [];
		for (var i = 0; i < num; i++) {
			stars.push(<Grade key={i} color={grey600} />);
		}
		return stars;
	}
	renderTableRows() {
		const rows = this.state.opps
			.reverse()
			.map(
				({ _id, company, jobTitle, status, lastUpdate, priority, appLink }) => {
					let color;
					let statusLabel = "";
					switch (status) {
						case 1:
							color = "#EA4335";
							statusLabel = "Interested";
							break;
						case 2:
							color = "#FBBC05";
							statusLabel = "Applied";
							break;
						case 3:
							color = "#4285F4";
							statusLabel = "Interviewing";
							break;
						case 4:
							color = "#34A853";
							statusLabel = "Received Offer";
							break;
						default:
							color = "white";
					}
					return (
						<TableRow key={_id}>
							<TableRowColumn>
								<b>{company}</b>
							</TableRowColumn>
							<TableRowColumn>{jobTitle}</TableRowColumn>
							<TableRowColumn>
								<div
									style={{
										backgroundColor: color,
										padding: "5px",
										borderRadius: "5px",
										textAlign: "center"
									}}
								>
									<span style={{ color: "white" }}>{statusLabel}</span>
								</div>
							</TableRowColumn>
							<TableRowColumn>
								{lastUpdate ? lastUpdate.slice(0, 10) : ""}
							</TableRowColumn>
							<TableRowColumn>{this.renderStars(priority)}</TableRowColumn>
							<TableRowColumn
								style={{
									display: "flex",
									justifyContent: "space-around",
									overflow: "visible"
								}}
							>
								{appLink ? (
									<IconButton
										href={appLink}
										target="_blank"
										tooltip="Application Link"
										tooltipPosition="bottom-center"
									>
										<LinkIcon color={grey600} />
									</IconButton>
								) : (
									<IconButton disabled={true}>
										<LinkIcon />
									</IconButton>
								)}
								<IconButton
									containerElement={<Link to={`/opp/${_id}`} />}
									tooltip="More Info"
									tooltipPosition="bottom-center"
								>
									<Info color={grey600} />
								</IconButton>
								<IconButton tooltip="Edit" tooltipPosition="bottom-center">
									<ModeEdit color={grey600} />
								</IconButton>
							</TableRowColumn>
						</TableRow>
					);
				}
			);
		this.setState({ tableRows: rows });
	}
	handleSearch = async event => {
		let search = event.target.value.toLowerCase();
		let filteredOpps = this.originalOpps.filter(opp => {
			return (
				opp.company.toLowerCase().includes(search) ||
				opp.jobTitle.toLowerCase().includes(search)
			);
		});
		filteredOpps = filteredOpps.reverse();
		await this.setState({
			opps: filteredOpps,
			tableHeaders: [
				{ label: "Company", value: "company", sortable: true, reversed: 0 },
				{
					label: "Job Title",
					value: "jobTitle",
					sortable: true,
					reversed: 0
				},
				{ label: "Status", value: "status", sortable: true, reversed: 0 },
				{
					label: "Last Update",
					value: "lastUpdate",
					sortable: false,
					reversed: 0
				},
				{ label: "Priority", value: "priority", sortable: true, reversed: 0 }
			]
		});
		this.renderTableRows();
	};

	render() {
		return (
			<div>
				<div style={styles.searchBar}>
					<SearchIcon style={styles.searchBarIcon} color={grey400} />
					<TextField
						style={styles.searchField}
						hintText="Search"
						fullWidth={true}
						underlineShow={false}
						onChange={this.handleSearch}
					/>
				</div>
				<Table
					wrapperStyle={{ overflow: "visible" }}
					bodyStyle={{ overflow: "visible" }}
				>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>{this.renderTableHeaders()}</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false} showRowHover>
						{this.state.tableRows}
					</TableBody>
				</Table>
			</div>
		);
	}
}

const styles = {
	searchBar: {
		position: "relative",
		display: "inline-block",
		width: "100%"
	},
	searchBarIcon: {
		position: "absolute",
		left: 0,
		top: 14,
		width: 20,
		height: 20
	},
	searchField: {
		textIndent: 30
	},
	tableHeaders: {
		fontSize: "0.9em"
	},
	header: {
		display: "flex",
		alignItems: "center",
		cursor: "pointer"
	}
};

function mapStateToProps({ opps }) {
	return { opps };
}

export default connect(mapStateToProps, { fetchOpps })(OppTable);
