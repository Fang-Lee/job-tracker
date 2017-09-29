import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import './OppForm.css';

import OppField from './OppField';
import formFields from './formFields';

class OppForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name, type, style }) => {
			return (
				<Field
					key={name}
					component={OppField}
					type={type}
					label={label}
					name={name}
					style={style}
				/>
			);
		});
	}
	render() {
		return (
			<div>
				<h2>Add a new oppurtunity</h2>
				<form>
					<div className="form-fields">
						{this.renderFields()}
					</div>
					<Link to="/dashboard" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Add
					</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'oppForm'
})(OppForm);
