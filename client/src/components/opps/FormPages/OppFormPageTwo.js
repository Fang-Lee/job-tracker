import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formFields from '../formFields';
import './OppFormPages.css';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const pageTwoFormFields = formFields.slice(10, 15);

class OppFormPageOne extends Component {
	renderFields() {
		return pageTwoFormFields.map(
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
	form: 'oppForm'
})(OppFormPageOne);
