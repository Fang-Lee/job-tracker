import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import './OppFormPages.css';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
	input: { value: omitValue, onChange, onBlur, ...inputProps },
	meta: { error, touched },
	...props
}) => (
	<div className="file-input-wrapper">
		Upload File
		<input
			className="file-input"
			onChange={adaptFileEventToValue(onChange)}
			onBlur={adaptFileEventToValue(onBlur)}
			type="file"
			{...inputProps}
			{...props}
		/>
		<div className="error-text">{touched && error}</div>
	</div>
);

class OppFormPageOne extends Component {
	render() {
		return (
			<form onSubmit={this.props.handleSubmit}>
				<div className="document-fields">
					<div>
						<h4>Resume:</h4>
						<Field name="resume" component={FileInput} />
						{this.props.formValues.resume && <p>{this.props.formValues.resume.name}</p>}
					</div>
					<div>
						<h4>Cover Letter:</h4>
						<Field name="coverLetter" component={FileInput} />
						{this.props.formValues.coverLetter && <p>{this.props.formValues.coverLetter.name}</p>}
					</div>
				</div>
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

const fileMaxSize = 3 * 1000 * 1000; // 3MB

function validate(values) {
	const errors = {};

	const fileFields = ['resume', 'coverLetter'];

	fileFields.forEach(field => {
		if (values.resume) {
			if (values.resume.size > fileMaxSize) {
				errors.resume = 'File size exceeds maximum size';
			}
		}
	});

	return errors;
}

function mapStateToProps(state) {
	return {
		formValues: state.form.oppForm.values
	};
}

export default reduxForm({
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
	form: 'oppForm',
	validate
})(connect(mapStateToProps)(OppFormPageOne));
