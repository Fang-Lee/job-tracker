import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOpps } from '../../actions';
import './OppTable.css';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Grade from 'material-ui/svg-icons/action/grade';
import Info from 'material-ui/svg-icons/action/info';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import LinkIcon from 'material-ui/svg-icons/content/link';
import UpArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { grey400, grey600 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';

const RESULTS_PER_PAGE = 10;

class OppTable extends Component {
	constructor(props) {
		super(props);
		this.originalOpps = [];
		this.state = {
			tableHeaders: [
				{ label: 'Company', value: 'company', sortable: true, reversed: 0 },
				{
					label: 'Job Title',
					value: 'jobTitle',
					sortable: true,
					reversed: 0
				},
				{ label: 'Status', value: 'status', sortable: true, reversed: 0 },
				{
					label: 'Last Update',
					value: 'lastUpdate',
					sortable: false,
					reversed: 0
				},
				{ label: 'Priority', value: 'priority', sortable: true, reversed: 0 }
			],
			opps: null,
			tableRows: [],
			search: '',
			page: 1,
			totalOpps: 0,
			totalPages: 0
		};
	}

	async componentDidMount() {
		await this.props.fetchOpps();
		this.originalOpps = this.props.opps;

		this.setState({
			opps: this.props.opps.reverse(),
			totalOpps: this.props.opps.length,
			totalPages: Math.floor(this.props.opps.length / RESULTS_PER_PAGE + 1)
		});
	}
	handleSort = (value, reversed, index) => {
		let sortedOpps = this.state.opps;
		let selectedCol = this.state.tableHeaders[index];
		sortedOpps.sort(function(a, b) {
			let x = a[value];
			let y = b[value];
			if (typeof x === 'string') {
				x = x.toLowerCase();
				y = y.toLowerCase();
			}
			return x > y ? 1 : y > x ? -1 : 0;
		});
		if (reversed === 0 || reversed === 2) {
			selectedCol.reversed = 1;
		} else {
			sortedOpps = sortedOpps.reverse();
			selectedCol.reversed = 2;
		}
		if (value === 'priority') {
			sortedOpps = sortedOpps.reverse();
		}
		let updatedHeaders = [
			{ label: 'Company', value: 'company', sortable: true, reversed: 0 },
			{
				label: 'Job Title',
				value: 'jobTitle',
				sortable: true,
				reversed: 0
			},
			{ label: 'Status', value: 'status', sortable: true, reversed: 0 },
			{
				label: 'Last Update',
				value: 'lastUpdate',
				sortable: false,
				reversed: 0
			},
			{ label: 'Priority', value: 'priority', sortable: true, reversed: 0 }
		];
		updatedHeaders[index] = selectedCol;
		this.setState({ opps: sortedOpps, tableHeaders: updatedHeaders, page: 1 });
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
				style={{ textAlign: 'center', ...styles.tableHeaders }}
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
		const { page, totalOpps } = this.state;
		let croppedRows = [];
		if ((page - 1) * RESULTS_PER_PAGE + RESULTS_PER_PAGE > totalOpps) {
			croppedRows = this.state.opps.slice((page - 1) * RESULTS_PER_PAGE);
		} else {
			croppedRows = this.state.opps.slice(
				(page - 1) * RESULTS_PER_PAGE,
				(page - 1) * RESULTS_PER_PAGE + RESULTS_PER_PAGE
			);
		}
		return croppedRows
			.map(
				({ _id, company, jobTitle, status, lastUpdate, priority, appLink }) => {
					let color;
					let statusLabel = '';
					switch (status) {
						case 1:
							color = '#EA4335';
							statusLabel = 'Interested';
							break;
						case 2:
							color = '#FBBC05';
							statusLabel = 'Applied';
							break;
						case 3:
							color = '#4285F4';
							statusLabel = 'Interviewing';
							break;
						case 4:
							color = '#34A853';
							statusLabel = 'Received Offer';
							break;
						default:
							color = 'white';
					}
					return (
						<TableRow key={_id}>
							<TableRowColumn>{company}</TableRowColumn>
							<TableRowColumn>{jobTitle}</TableRowColumn>
							<TableRowColumn>
								<div
									style={{
										backgroundColor: color,
										padding: '5px',
										borderRadius: '5px',
										textAlign: 'center'
									}}
								>
									<span style={{ color: 'white' }}>{statusLabel}</span>
								</div>
							</TableRowColumn>
							<TableRowColumn>
								{lastUpdate ? lastUpdate.slice(0, 10) : ''}
							</TableRowColumn>
							<TableRowColumn>{this.renderStars(priority)}</TableRowColumn>
							<TableRowColumn
								style={{
									display: 'flex',
									justifyContent: 'space-around',
									overflow: 'visible'
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
		this.setState({
			opps: filteredOpps,
			tableHeaders: [
				{ label: 'Company', value: 'company', sortable: true, reversed: 0 },
				{
					label: 'Job Title',
					value: 'jobTitle',
					sortable: true,
					reversed: 0
				},
				{ label: 'Status', value: 'status', sortable: true, reversed: 0 },
				{
					label: 'Last Update',
					value: 'lastUpdate',
					sortable: false,
					reversed: 0
				},
				{ label: 'Priority', value: 'priority', sortable: true, reversed: 0 }
			],
			page: 1,
			totalPages: Math.floor(filteredOpps.length / RESULTS_PER_PAGE + 1),
			totalOpps: filteredOpps.length
		});
	};
	handleLeftArrow = () => {
		if (this.state.page > 1) {
			this.setState({ page: this.state.page - 1 });
		}
	};
	handleRightArrow = () => {
		if (this.state.page < this.state.totalPages) {
			this.setState({ page: this.state.page + 1 });
		}
	};
	handleNumberClick = (i) => {
		this.setState({ page: i});
	}
	renderPaginationNumbers = () => {
		let pageNumbers = [];
		for (let i = 1; i < this.state.totalPages + 1; i++) {
			if (i === this.state.page) {
				pageNumbers.push(
					<span className="page-number clickable" key={i} onClick={() => this.handleNumberClick(i)}>
						<b>{i}</b>
					</span>
				);
			} else {
				pageNumbers.push(
					<span className="page-number clickable" key={i} onClick={() => this.handleNumberClick(i)}>
						{i}
					</span>
				);
			}
		}
		return pageNumbers;
	};
	render() {
		const { opps, page, totalPages, totalOpps } = this.state;
		if (!opps) {
			return (
				<div className="loading-circle">
					<CircularProgress size={80} thickness={5} />
				</div>
			);
		}
		return (
			<div style={styles.tableWrapper}>
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
					wrapperStyle={{ overflow: 'visible' }}
					bodyStyle={{ overflow: 'visible' }}
				>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>{this.renderTableHeaders()}</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false} showRowHover>
						{this.renderTableRows()}
					</TableBody>
				</Table>
				<div className="pagination-wrapper">
					<i
						className="fa fa-chevron-left nav-arrows clickable"
						onClick={this.handleLeftArrow}
					/>
					<div className="pagination-numbers">
						{this.renderPaginationNumbers()}
					</div>
					<i
						className="fa fa-chevron-right nav-arrows clickable"
						onClick={this.handleRightArrow}
					/>
					<div className="pagination-page-number">
						{(page-1) * RESULTS_PER_PAGE + 1}-{(page-1) * RESULTS_PER_PAGE + RESULTS_PER_PAGE < totalOpps ? (page-1) * RESULTS_PER_PAGE + RESULTS_PER_PAGE : totalOpps }  of {totalOpps}
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	searchBar: {
		position: 'relative',
		display: 'inline-block',
		width: '100%'
	},
	searchBarIcon: {
		position: 'absolute',
		left: 0,
		top: 14,
		width: 20,
		height: 20
	},
	searchField: {
		textIndent: 30
	},
	tableHeaders: {
		fontSize: '0.9em'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer'
	},
	tableWrapper: {
		marginBottom: '20px'
	}
};

function mapStateToProps({ opps }) {
	return { opps };
}

export default connect(mapStateToProps, { fetchOpps })(OppTable);
