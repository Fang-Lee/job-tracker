import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchOpp, deleteOpp, archiveOpp, unarchiveOpp } from '../../actions';

import './OppPage.css';

import { grey600 } from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';

class OppPage extends Component {
	state = {
		contentHidden: false,
		showMoreOn: false,
		actionMenuOpen: false,
		deleteAlertOpen: false,
		archiveAlertOpen: false,
		snackbarOpen: true,
		snackbarMessage: 'Successfully Edited',
		unarchiveStatus: 1
	};
	async componentDidMount() {
		const { id } = this.props.match.params;
		await this.props.fetchOpp(id);
		const height = document.getElementById('descriptions').clientHeight;
		if (height > 425) {
			this.setState({ showMoreOn: true, contentHidden: true });
		}
	}
	handleActionMenuOpen = event => {
		event.preventDefault();
		this.setState({
			actionMenuOpen: true,
			anchorEl: event.currentTarget
		});
	};
	handleRequestClose = () => {
		this.setState({
			actionMenuOpen: false
		});
	};
	handleDeleteAlertOpen = () => {
		this.setState({
			deleteAlertOpen: true
		});
	};
	handleDeleteAlertClose = () => {
		this.setState({
			deleteAlertOpen: false
		});
	};
	handleArchiveAlertOpen = () => {
		this.setState({
			archiveAlertOpen: true
		});
	};
	handleArchiveAlertClose = () => {
		this.setState({
			archiveAlertOpen: false
		});
	};
	handleSnackbarOpen = () => {
		this.setState({
			snackbarOpen: true
		});
	};
	handleSnackbarClose = () => {
		this.setState({
			snackbarOpen: false
		});
	};
	renderStatus(status, priority) {
		let color;
		let statusLabel = '';
		switch (status) {
			case 1:
				color = '#EA4335';
				statusLabel = 'INTERESTED';
				break;
			case 2:
				color = '#FBBC05';
				statusLabel = 'APPLIED';
				break;
			case 3:
				color = '#4285F4';
				statusLabel = 'INTERVIEWING';
				break;
			case 4:
				color = '#34A853';
				statusLabel = 'RECEIVED OFFER';
				break;
			case 5:
				color = grey600;
				statusLabel = 'ARCHIVED';
				break;
			default:
				color = 'white';
		}
		return (
			<div className="opp-status" style={{ backgroundColor: color }}>
				<span className="opp-status-text">{statusLabel}</span>
			</div>
		);
	}
	renderText(text) {
		if (text) {
			return text.split('\n').map((line, index) => {
				return (
					<span key={index}>
						{line}
						<br />
					</span>
				);
			});
		} else {
			return (
				<span>
					<br />
					<br />
				</span>
			);
		}
	}
	renderDescriptions() {
		const { opp } = this.props;
		const {
			_id,
			salary,
			jobDescription,
			companyDescription,
			responsibilities,
			qualifications,
			status
		} = opp;
		if (
			!jobDescription &&
			!companyDescription &&
			!responsibilities &&
			!qualifications &&
			status < 5
		) {
			return (
				<Paper id="descriptions" className="descriptions add-descriptions">
					<Link to={`/edit/opp/${_id}`} className="add-descriptions-link">
						Add Company/Job Description
					</Link>
				</Paper>
			);
		}
		return (
			<Paper id="descriptions" className="descriptions">
				<div className="job-description">
					<h3>Job Description/Responsibilities</h3>
					<p>{this.renderText(jobDescription)}</p>
					<Divider />
					<h3>Qualifications</h3>
					<p>{this.renderText(qualifications)}</p>
					<Divider />
				</div>
				<div className="company-description">
					<div className="company-description-misc">
						{salary && (
							<div>
								<div>
									<h3>Salary</h3>
									<p>{salary}</p>
								</div>
								<Divider />
							</div>
						)}
					</div>
					<h3>Company Description</h3>
					<p className="overflow-scroll">
						{this.renderText(companyDescription)}
					</p>
					<Divider />
				</div>
				{this.state.contentHidden && <div className="fadeout" />}
			</Paper>
		);
	}
	showBtnClicked = () => {
		this.setState({ contentHidden: !this.state.contentHidden });
	};
	renderTags = tags => {
		if (typeof tags === 'string') {
			tags = tags.split(',');
		}
		return tags.map((tag, index) => (
			<Chip key={index} className="tag-chip">
				{tag}
			</Chip>
		));
	};
	handleUnarchiveStatus = (event, index, value) => {
		console.log('status', value);
		this.setState({ unarchiveStatus: value });
	};
	render() {
		const { opp } = this.props;
		if (!opp) {
			return (
				<LinearProgress
					className="loading-bar"
					mode="indeterminate"
					color={grey600}
				/>
			);
		}
		const {
			_id,
			company,
			jobTitle,
			location,
			status,
			priority,
			contactName,
			contactEmail,
			contactPhone,
			lastContact,
			notes,
			resume,
			coverLetter,
			resumeLink,
			coverLetterLink,
			tags
		} = opp;
		const deleteActions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleDeleteAlertClose}
			/>,
			<RaisedButton
				label="Delete"
				labelColor="#fff"
				backgroundColor="#EA4335"
				onClick={() => {
					this.handleDeleteAlertClose();
					console.log('deleting opp');
					this.props.deleteOpp(_id, this.props.history);
				}}
			/>
		];
		const archiveActions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleArchiveAlertClose}
			/>,
			<RaisedButton
				label="Confirm"
				labelColor="#fff"
				backgroundColor="#EA4335"
				onClick={() => {
					this.handleArchiveAlertClose();
					this.props.archiveOpp(_id, this.props.history);
				}}
			/>
		];
		const unarchiveActions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleArchiveAlertClose}
			/>,
			<RaisedButton
				label="Unarchive"
				labelColor="#fff"
				backgroundColor="#EA4335"
				onClick={() => {
					this.handleArchiveAlertClose();
					this.props.unarchiveOpp(
						_id,
						this.state.unarchiveStatus,
						this.props.history
					);
					window.location.reload();
				}}
			/>
		];
		return (
			<div className="opp-page-wrapper">
				<div className="opp-page-header">
					<div className="company-job-header">
						<h2 className="company-name">{company}</h2>
						<div className="location-title">
							<i>
								{jobTitle}{' '}
								{location && `${String.fromCharCode(183)} ${location}`}{' '}
							</i>
						</div>
					</div>
					<div className="opp-page-header-right">
						{this.renderStatus(status, priority)}
						<i
							className="fa fa-ellipsis-h actions"
							name="actionMenu"
							onClick={this.handleActionMenuOpen}
						/>
						<Popover
							name="actionMenu"
							open={this.state.actionMenuOpen}
							anchorEl={this.state.anchorEl}
							anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
							targetOrigin={{ horizontal: 'right', vertical: 'top' }}
							onRequestClose={this.handleRequestClose}
						>
							<Menu>
								{status < 5 && (
									<MenuItem>
										<Link to={`/edit/opp/${_id}`}>
											<div className="action-menu-items">Edit</div>
										</Link>
									</MenuItem>
								)}
								<MenuItem
									onClick={() => {
										this.handleArchiveAlertOpen();
										this.handleRequestClose();
									}}
									primaryText={status === 5 ? 'Unarchive' : 'Archive'}
								/>
								<MenuItem
									onClick={() => {
										this.handleDeleteAlertOpen();
										this.handleRequestClose();
									}}
									primaryText="Delete"
								/>
							</Menu>
						</Popover>
						<Dialog
							actions={deleteActions}
							modal={false}
							open={this.state.deleteAlertOpen}
							onRequestClose={this.handleDeleteAlertClose}
						>
							Delete this opportunity?
						</Dialog>
						{status < 5 ? (
							<Dialog
								actions={archiveActions}
								modal={false}
								open={this.state.archiveAlertOpen}
								onRequestClose={this.handleArchiveAlertClose}
							>
								Archive this opportunity?
							</Dialog>
						) : (
							<Dialog
								actions={unarchiveActions}
								modal={false}
								open={this.state.archiveAlertOpen}
								onRequestClose={this.handleArchiveAlertClose}
							>
								<div>
									<div style={{ marginBottom: '10px' }}>
										Unarchive this opportunity?
									</div>
									<SelectField
										value={this.state.unarchiveStatus}
										onChange={this.handleUnarchiveStatus}
									>
										<MenuItem value={1} primaryText="Interested" />
										<MenuItem value={2} primaryText="Applied" />
										<MenuItem value={3} primaryText="Interviewing" />
										<MenuItem value={4} primaryText="Received Offer" />
									</SelectField>
								</div>
							</Dialog>
						)}
					</div>
				</div>
				<div className="tags">{tags && this.renderTags(tags)}</div>
				<div>
					{this.state.showMoreOn ? (
						this.state.contentHidden ? (
							<div>
								<div id="descriptions" className="opp-page-body-truncated">
									{this.renderDescriptions()}
								</div>
								<Paper
									className="show-more-btn"
									onClick={() => {
										this.showBtnClicked();
									}}
								>
									<span>See More</span> <i className="fa fa-angle-down" />
								</Paper>
							</div>
						) : (
							<div className="opp-page-body">
								{this.renderDescriptions()}
								<Paper
									className="show-less-btn"
									onClick={() => {
										this.showBtnClicked();
									}}
								>
									<span>See Less</span> <i className="fa fa-angle-up" />
								</Paper>
							</div>
						)
					) : (
						this.renderDescriptions()
					)}
				</div>
				<div className="contact-documents-wrapper">
					<div className="contact-wrapper">
						<Paper className="contact-content">
							<h3>Recruiter Information</h3>
							<Divider />
							<div className="contact-info">
								<div>
									<i className="fa fa-user-circle-o" />
									<span className="truncate">{contactName}</span>
								</div>
								<Divider />
								<div>
									<i className="fa fa-envelope-o" />
									<span className="truncate">{contactEmail}</span>
								</div>
								<Divider />
								<div>
									<i className="fa fa-phone" />
									<span className="truncate">{contactPhone}</span>
								</div>
								<Divider />
								<div>
									<i className="fa fa-calendar" />
									<span>
										{lastContact ? (
											<span>Last Contact: {lastContact.slice(0, 10)}</span>
										) : (
											''
										)}
									</span>
								</div>
							</div>
						</Paper>
					</div>
					<div className="documents-wrapper">
						<Paper className="documents-content">
							<h3>Documents</h3>
							<Divider />
							{!resumeLink && !coverLetterLink && status < 5 ? (
								<div className="file-link-wrapper">
									<Link to={`/edit/opp/${_id}`} className="add-files-link">
										Upload Resume/Cover Letter
									</Link>
								</div>
							) : (
								<div className="file-link-wrapper">
									{resumeLink && (
										<a href={resumeLink} target="_blank">
											<div className="file-link">
												<i className="fa fa-file-text-o fa-4x" />
												<p className="file-label">
													Resume: {resume.split('/').slice(-1)[0]}
												</p>
											</div>
										</a>
									)}
									{coverLetterLink && (
										<a href={coverLetterLink} target="_blank">
											<div className="file-link">
												<i className="fa fa-file-text-o fa-4x" />
												<p className="file-label">
													Cover Letter: {coverLetter.split('/').slice(-1)[0]}
												</p>
											</div>
										</a>
									)}
								</div>
							)}
						</Paper>
					</div>
				</div>
				<div className="notes-wrapper">
					<Paper className="notes-content">
						<h3>Notes</h3>
						<Divider />
						<p>{notes}</p>
					</Paper>
				</div>
				<Link to="/dashboard" className="home-btn">
					<FloatingActionButton>
						<i className="fa fa-home" />
					</FloatingActionButton>
				</Link>
				{this.props.location.state ? (
					this.props.location.state.snackbarOpen ? (
						<Snackbar
							open={
								this.state.snackbarOpen &&
								this.props.location.state.snackbarOpen
							}
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

function mapStateToProps(state, ownProps) {
	return {
		opp: state.opps[ownProps.match.params.id],
		snackbarOpen: state.snackbarOpen
	};
}

export default connect(mapStateToProps, {
	fetchOpp,
	deleteOpp,
	archiveOpp,
	unarchiveOpp
})(withRouter(OppPage));
