import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import formFields from '../formFields';
import * as actions from '../../../actions';
import './OppFormPages.css';

import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const pageOneFormFields = formFields.slice(1, 10);

class OppFormPageOne extends Component {
	renderFields() {
		return pageOneFormFields.map(
			({ type, component, name, label, style, hint, children }) => {
				switch (type) {
					case 'subHeader':
						return (
							<h3 key={label} style={style}>
								{label}
							</h3>
						);
					case 'selectField':
						const menuItems = children.map(({ value, textLabel }) => (
							<MenuItem key={value} value={value} primaryText={textLabel} />
						));
						return (
							<Field
								key={name}
								component={component}
								label={label}
								style={style}
								name={name}
							>
								{menuItems}
							</Field>
						);
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
						disabled={true}
						style={{ marginRight: 12 }}
					/>
					<RaisedButton type="submit" label="Next" primary={true} />
				</div>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	const requiredFields = ['company', 'jobTitle', 'status'];

	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = '*Required';
		}
	});

	return errors;
}

export default reduxForm({
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
	form: 'oppForm',
	validate
})(OppFormPageOne);
