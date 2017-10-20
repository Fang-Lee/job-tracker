import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOpp } from '../../actions';

class EditOppPage extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchOpp(id);
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
			responsibilities,
			qualifications,
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
			<div className="edit-page-wrapper">
				<div className="edit-page-header">
					<h1>Editing {company}</h1>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ opps }, ownProps) {
	return { opp: opps[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchOpp })(EditOppPage);
