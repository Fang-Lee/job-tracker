import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOpp } from "../../actions";
import "./OppPage.css";

import Paper from "material-ui/Paper";
import Star from "material-ui/svg-icons/action/grade";
import DownArrow from "material-ui/svg-icons/hardware/keyboard-arrow-down";

class OppPage extends Component {
	state = { contentHidden: true };
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchOpp(id);
	}
	renderStatus(status, priority) {
		let color;
		let stars = [];
		let statusLabel = "";
		switch (status) {
			case 1:
				color = "#EA4335";
				statusLabel = "INTERESTED";
				break;
			case 2:
				color = "#FBBC05";
				statusLabel = "APPLIED";
				break;
			case 3:
				color = "#4285F4";
				statusLabel = "INTERVIEWING";
				break;
			case 4:
				color = "#34A853";
				statusLabel = "RECEIVED OFFER";
				break;
			default:
				color = "white";
		}
		return (
			<div className="opp-status" style={{ backgroundColor: color }}>
				<span className="opp-status-text">{statusLabel}</span>
			</div>
		);
	}
	renderText(text) {
		if (text) {
			return text.split("\n").map((line, index) => {
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
					<br />
				</span>
			);
		}
	}
	showBtnClicked = () => {
		console.log("clicked");
		this.setState({ contentHidden: !this.state.contentHidden });
	};
	render() {
		const { opp } = this.props;
		if (!opp) {
			return <div>Loading...</div>;
		}
		const {
			company,
			jobTitle,
			location,
			status,
			salary,
			origin,
			appLink,
			jobDescription,
			companyDescription,
			responsibilities,
			qualifications,
			lastUpdate,
			priority,
			contactName,
			contactEmail,
			contactPhone,
			lastContact,
			notes
		} = opp;
		return (
			<div className="opp-page-wrapper">
				<div className="opp-page-header">
					<div>
						<h2 className="company-name">{company}</h2>
						{jobTitle}
					</div>
					{this.renderStatus(status, priority)}
				</div>
				{this.state.contentHidden ? (
					<div>
						<div className="opp-page-body-truncated">
							<Paper className="descriptions">
								<div className="job-description">
									<h3>Job Description</h3>
									<p>{this.renderText(jobDescription)}</p>
									<h3>Responsibilities</h3>
									<p>{this.renderText(responsibilities)}</p>
									<h3>Qualifications</h3>
									<p>{this.renderText(qualifications)}</p>
								</div>
								<div className="company-description">
									<h3>Location</h3>
									<p>{location}</p>
									<h3>Company Description</h3>
									<p>{this.renderText(companyDescription)}</p>
								</div>
								<div className="fadeout" />
							</Paper>
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
						<Paper className="descriptions">
							<div className="job-description">
								<h3>Job Description</h3>
								<p>{this.renderText(jobDescription)}</p>
								<h3>Responsibilities</h3>
								<p>{this.renderText(responsibilities)}</p>
								<h3>Qualifications</h3>
								<p>{this.renderText(qualifications)}</p>
							</div>
							<div className="company-description">
								<h3>Location</h3>
								<p>{location}</p>
								<h3>Company Description</h3>
								<p>{this.renderText(companyDescription)}</p>
							</div>
						</Paper>
						<Paper
							className="show-less-btn"
							onClick={() => {
								this.showBtnClicked();
							}}
						>
							<span>See Less</span> <i className="fa fa-angle-up" />
						</Paper>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps({ opps }, ownProps) {
	return { opp: opps[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchOpp })(OppPage);
