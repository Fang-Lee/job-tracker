import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOpp } from "../../actions";
import "./OppPage.css";

import { white } from 'material-ui/styles/colors'
import Star from 'material-ui/svg-icons/action/grade';

class OppPage extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchOpp(id);
	}
	renderStatus(status, priority) {
		let color;
		let stars = [];
		console.log(status);
		console.log(color);
		console.log(status === "INTERESTED")
		switch (status) {
			case "INTERESTED":
				color = '#EA4335';
				break;
			case "APPLIED":
				color = '#FBBC05';
				break;
			case "INTERVIEWING":
				color = '#34A853';
				break;
			case "RECEIVED OFFER":
				color = '#4285F4';
				break;
			default:
				color = 'white';
		}
		return (
			<div className="opp-status" style={{backgroundColor: color}}>
				<span className="opp-status-text">{status.toUpperCase()}</span>
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
					{this.renderStatus(status.toUpperCase(), priority)}
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
