import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import formFields from '../formFields';
import * as actions from '../../../actions';
import './OppFormPages.css';

import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const pageThreeFormFields = formFields.slice(16, 20);

class OppFormPageOne extends Component {
	renderFields() {
		return pageThreeFormFields.map(
			({ type, component, name, label, style, hint, children }) => {
				switch (type) {
					case 'datePicker':
						return (
							<Field
								key={name}
								component={component}
								label={label}
								style={style}
								name={name}
							/>
						);
					default:
						return (
							<Field
								key={name}
								component={component}
								label={label}
								name={name}
								style={style}
								hint={hint}
							/>
						);
				}
			}
		);
	}
	render() {
		return (
			<form onSubmit={this.props.handleSubmit}>
				<div className="form-fields">{this.renderFields()}</div>
				<div className="nav-buttons">
					<FlatButton
						label="Back"
						onClick={this.props.handlePrev}
						style={{ marginRight: 12 }}
					/>
					<RaisedButton type="submit" label="Next" primary={true} />
				</div>
			</form>
		);
	}
}

export default reduxForm({
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
	form: 'oppForm',
})(OppFormPageOne);
