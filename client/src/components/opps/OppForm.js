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

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
	input: { value: omitValue, onChange, onBlur, ...inputProps },
	meta: { error, touched },
	...props
}) => (
	<div>
		<input
			onChange={adaptFileEventToValue(onChange)}
			onBlur={adaptFileEventToValue(onBlur)}
			type="file"
			{...inputProps}
			{...props}
		/>
		<div className="error-text">{touched && error}</div>
	</div>
);

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
					encType="multipart/form-data"
					onSubmit={this.props.handleSubmit(() => {
						this.props.submitForm(this.props.formValues, this.props.history);
					})}
				>
					<div className="form-fields">
						{this.renderFields()}
						<div>
							<h3>Documents</h3>
							<h6>Resume:</h6>
							<Field name="resume" component={FileInput} />
							<h6>Cover Letter:</h6>
							<Field name="coverLetter" component={FileInput} />
						</div>
					</div>
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

const fileMaxSize = 10 * 1000 * 1000; // 1MB

function validate(values) {
	const errors = {};

	const requiredFields = ['company', 'jobTitle', 'status'];
	const fileFields = ['resume', 'coverLetter'];

	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	});

	fileFields.forEach(field => {
		if (values.resume) {
			if (values.resume.size > fileMaxSize) {
				errors.resume = 'File size exceeds maximum size';
			}
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'oppForm'
})(connect(mapStateToProps, actions)(withRouter(OppForm)));
