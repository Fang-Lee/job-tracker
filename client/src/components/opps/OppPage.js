import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOpp } from "../../actions";

class OppPage extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchOpp(id);
	}
	render() {
		console.log(this.props);
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
				<h1>{company}</h1> 
				{jobTitle}
			</div>);
	}
}

const styles = {
	header: {
		
	}
}

function mapStateToProps({ opps }, ownProps) {
	console.log(opps);
	console.log(ownProps);
	return { opp: opps[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchOpp })(OppPage);
