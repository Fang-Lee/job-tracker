import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOpp } from '../../actions';
import './OppPage.css';

import { grey600 } from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';

class OppPage extends Component {
	state = { contentHidden: false, showMoreOn: false };
	async componentDidMount() {
		const { id } = this.props.match.params;
		await this.props.fetchOpp(id);
		const height = document.getElementById('descriptions').clientHeight;
		if (height > 425) {
			this.setState({ showMoreOn: true, contentHidden: true });
		}
	}
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
			qualifications,
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
							<div>{location ? location : <div><br /><br /></div>}</div>
						</div>
						{salary && (
							<div>
								<h3>Salary</h3>
								<p>{salary}</p>
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
			company,
			jobTitle,
			status,
			origin,
			appLink,
			lastUpdate,
			priority,
			contactName,
			contactEmail,
			contactPhone,
			lastContact,
			notes,
			tags
		} = opp;
		return (
			<div className="opp-page-wrapper">
				<div className="opp-page-header">
					<div>
						<h2 className="company-name">{company}</h2> <i>{jobTitle}</i>
					</div>
					{this.renderStatus(status, priority)}
				</div>
				<div className="tags">
					{tags &&
						tags.map((tag, index) => (
							<Chip key={index} className="tag-chip">
								{tag}
							</Chip>
						))}
				</div>
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
									<i className="fa fa-envelope-o" /><span>{contactEmail}</span>
								</div>
								<Divider />
								<div>
									<i className="fa fa-phone" /><span>{contactPhone}</span>
								</div>
								<Divider />
								<div>
									<i className="fa fa-calendar" />
									<span>{lastContact ? <span>Last Contact: {lastContact.slice(0, 10)}</span> : ''}</span>
								</div>
							</div>
						</Paper>
					</div>
					<div className="documents-wrapper">
						<Paper className="documents-content">
							<h3>Documents</h3>
							<Divider />
							<p>FILES GO HERE</p>
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

export default connect(mapStateToProps, { fetchOpp })(OppPage);
