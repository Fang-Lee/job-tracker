import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchOpp, deleteOpp, archiveOpp } from '../../actions';

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

class OppPage extends Component {
	state = {
		contentHidden: false,
		showMoreOn: false,
		actionMenuOpen: false,
		deleteAlertOpen: false,
		archiveAlertOpen: false
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
			location,
			salary,
			origin,
			appLink,
			jobDescription,
			companyDescription,
			responsibilities,
			qualifications
		} = opp;
		return (
			<Paper id="descriptions" className="descriptions">
				<div className="job-description">
					<h3>Job Description</h3>
					<p>{this.renderText(jobDescription)}</p>
					<Divider />
					<h3>Responsibilities</h3>
					<p>{this.renderText(responsibilities)}</p>
					<Divider />
					<h3>Qualifications</h3>
					<p>{this.renderText(qualifications)}</p>
					<Divider />
				</div>
				<div className="company-description">
					<div className="company-description-misc">
						<div>
							<h3>Location</h3>
							<div>
								{location ? (
									location
								) : (
									<div>
										<br />
									</div>
								)}
							</div>
							<br />
						</div>
						{salary ? (
							<div>
								<h3>Salary</h3>
								<p>{salary}</p>
							</div>
						) : (
							<div>
								<br />
							</div>
						)}
					</div>
					<Divider />
					<div className="company-description-misc">
						<div>
							<h3>Oppurtunity Source</h3>
							<div>
								{origin ? (
									origin
								) : (
									<div>
										<br />
									</div>
								)}
							</div>
							<br />
						</div>
						{salary ? (
							<div>
								<h3>Application Link</h3>
								<p>
									<a href={appLink}>Link</a>
								</p>
							</div>
						) : (
							<div>
								<br />
							</div>
						)}
					</div>
					<Divider />
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
			status,
			priority,
			contactName,
			contactEmail,
			contactPhone,
			lastContact,
			notes,
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
				onClick={this.handleDeleteAlertClose}
			/>,
			<RaisedButton
				label="Archive"
				labelColor="#fff"
				backgroundColor="#EA4335"
				onClick={() => {
					this.handleDeleteAlertClose();
					console.log('archiving opp');
					this.props.archiveOpp(_id, this.props.history);
				}}
			/>
		];
		return (
			<div className="opp-page-wrapper">
				<div className="opp-page-header">
					<div>
						<h2 className="company-name">{company}</h2> <i>{jobTitle}</i>
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
								<MenuItem>
									<Link to={`/edit/opp/${_id}`}>
										<div className="action-menu-items">Edit</div>
									</Link>
								</MenuItem>
								<MenuItem
									onClick={() => {
										this.handleArchiveAlertOpen();
										this.handleRequestClose();
									}}
									primaryText="Archive"
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
						<Dialog
							actions={archiveActions}
							modal={false}
							open={this.state.archiveAlertOpen}
							onRequestClose={this.handleArchiveAlertClose}
						>
							Archive this opportunity?
						</Dialog>
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
									<span>{contactName}</span>
								</div>
								<Divider />
								<div>
									<i className="fa fa-envelope-o" />
									<span>{contactEmail}</span>
								</div>
								<Divider />
								<div>
									<i className="fa fa-phone" />
									<span>{contactPhone}</span>
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
							<div className="file-link-wrapper">
								{resumeLink && (
									<a href={resumeLink} target="_blank">
										<div className="file-link">
											<i className="fa fa-file-text-o fa-4x" />
											<p>Resume</p>
										</div>
									</a>
								)}
								{coverLetterLink && (
									<a href={coverLetterLink} target="_blank">
										<div className="file-link">
											<i className="fa fa-file-text-o fa-4x" />
											<p>Cover Letter</p>
										</div>
									</a>
								)}
							</div>
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
			</div>
		);
	}
}

function mapStateToProps({ opps }, ownProps) {
	return { opp: opps[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchOpp, deleteOpp, archiveOpp })(
	withRouter(OppPage)
);
