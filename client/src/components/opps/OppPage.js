import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOpp } from "../../actions";
import "./OppPage.css";

import Paper from 'material-ui/Paper'
import Star from 'material-ui/svg-icons/action/grade';

class OppPage extends Component {
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
				color = '#EA4335';
				statusLabel = 'INTERESTED';
				break;
			case 2:
				color = '#FBBC05';
				statusLabel = 'APPLIED';
				break;
			case 3:
				color = '#4285F4';
				statusLabel = 'INTERVIEWING'
				break;
			case 4:
				color = '#34A853';
				statusLabel = 'RECEIVED OFFER'
				break;
			default:
				color = 'white';
		}
		return (
			<div className="opp-status" style={{backgroundColor: color}}>
				<span className="opp-status-text">{statusLabel}</span>
			</div>
		);
	}
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
			lastUpdate,
			priority,
			contactName,
			contactEmail,
			contactPhone,
			lastContact,
			notes
		} = opp;
		return (
			<div>
				<div className="opp-page-header">
					<div>
						<h1 className="company-name">{company}</h1>
						{jobTitle}
					</div>
					{this.renderStatus(status, priority)}
				</div>
				{jobTitle}
			</div>
		);
	}
}

function mapStateToProps({ opps }, ownProps) {
	return { opp: opps[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchOpp })(OppPage);
