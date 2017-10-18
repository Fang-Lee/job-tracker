import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import './OppFormPages.css';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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

class OppFormPageOne extends Component {
	render() {
		return (
			<form onSubmit={this.props.handleSubmit}>
				<div className="document-fields">
					<div>
						<h4>Resume:</h4>
						<Field name="resume" component={FileInput} />
					</div>
					<div>
						<h4>Cover Letter:</h4>
						<Field name="coverLetter" component={FileInput} />
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

const fileMaxSize = 15 * 1000 * 1000; // 15MB

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

export default reduxForm({
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
	form: 'oppForm',
	validate
})(OppFormPageOne);
