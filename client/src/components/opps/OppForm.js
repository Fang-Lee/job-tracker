import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import './OppForm.css';

import formFields from './formFields';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { white, red500, green500 } from 'material-ui/styles/colors';

class OppForm extends Component {
	state = { rating: 3 };
	handleRate = value => {
		console.log('hello');
		this.setState({
			rating: value
		});
	};
	renderFields() {
		return formFields.map(
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
								name={name}
								style={style}
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
								name={name}
								style={style}
							/>
						);
					case 'starRater':
						return (
							<Field
								key={name}
								component={component}
								name={name}
								rating={this.state.rating}
								handleRate={this.handleRate}
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
			<div className="opp-form">
				<h1>Add a new oppurtunity</h1>
				<br />
				<form
					onSubmit={this.props.handleSubmit(() => {
						this.props.submitForm(this.props.formValues, this.props.history);
					})}
				>
					<div className="form-fields">{this.renderFields()}</div>
					<div className="form-buttons">
						<RaisedButton
							containerElement={<Link to="/dashboard" />}
							label="Cancel"
							backgroundColor={red500}
							labelColor={white}
						/>
						<RaisedButton
							type="submit"
							label="Submit"
							backgroundColor={green500}
							labelColor={white}
						/>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		formValues: state.form.oppForm.values
	};
}

function validate(values) {
	const errors = {};

	const requiredFields = ['company', 'jobTitle'];

	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'oppForm'
})(connect(mapStateToProps, actions)(withRouter(OppForm)));
