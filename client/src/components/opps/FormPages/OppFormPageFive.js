import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import formFields from '../formFields';
import * as actions from '../../../actions';
import './OppFormPages.css';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const pageFiveFormFields = formFields.slice(21);

class OppFormPageOne extends Component {
	state = { submitted: false };
	renderFields() {
		return pageFiveFormFields.map(
			({ type, component, name, label, style, hint, children }) => {
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
		);
	}
	handleSubmitBtnClicked = () => {
		this.setState({ submitted: true });
	}
	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(() => {
					this.handleSubmitBtnClicked();
					console.log('file', this.props.formValues.resume);
					this.props.submitForm(this.props.formValues, this.props.history);
				})}
			>
				<div className="form-fields">{this.renderFields()}</div>
				<div className="nav-buttons">
					<FlatButton
						label="Back"
						onClick={this.props.handlePrev}
						style={{ marginRight: 12 }}
					/>
					{!this.state.submitted ? (
						<RaisedButton
							type="submit"
							label="Submit"
							backgroundColor="#34A853"
							labelColor="#fff"
						/>
					) : (
						<RaisedButton
							type="submit"
							label="Submit"
							backgroundColor="#34A853"
							labelColor="#fff"
							disabled={true}
						/>
					)}
				</div>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		formValues: state.form.oppForm.values
	};
}

export default reduxForm({
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
	form: 'oppForm'
})(connect(mapStateToProps, actions)(withRouter(OppFormPageOne)));
