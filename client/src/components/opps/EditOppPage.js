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
			return <div>Loading</div>;
		}
		return (
			<div>Editing Page {this.props.opp.company}</div>
		)
	}
}

function mapStateToProps({ opps }, ownProps) {
	return { opp: opps[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchOpp })(EditOppPage);