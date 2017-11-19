import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { fetchOppForEdit, editOpp } from "../../actions";
import {
	renderTextField,
	renderSelectField,
	renderDatePicker,
	renderTextAreaField
} from "../../utils/formElements";
import { withRouter } from "react-router-dom";
import "./EditOppPage.css";

import { Card, CardHeader, CardText } from "material-ui/Card";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

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

class EditOppPage extends Component {
	state = { opp: null, submitted: false };
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchOppForEdit(id);
	}
	handleSubmitBtnClicked = () => {
		this.setState({ submitted: true });
	};
	render() {
		const { opp, formValues } = this.props;
		console.log(this.props.opp);
		if (!opp || !formValues) {
			return <div>Loading...</div>;
		}
		const { _id, company } = opp;
		const { values } = this.props.formValues;
		return (
			<div className="edit-page-wrapper">
				<div className="edit-page-header">
					<h1>Editing {company}</h1>
				</div>
				<div className="edit-page-body">
					<form
						onSubmit={this.props.handleSubmit(() => {
							this.handleSubmitBtnClicked();
							this.props.editOpp(
								this.props.formValues.values,
								this.props.history
							);
						})}
					>
						<Card>
							<CardHeader
								title="General Information"
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<CardText expandable={true}>
								<div className="edit-fields-wrapper">
									<div className="edit-input-row">
										<Field
											name="company"
											label="Company*"
											component={renderTextField}
											type="text"
										/>
										<Field
											name="jobTitle"
											label="Job Title*"
											component={renderTextField}
											type="text"
										/>
									</div>
									<div className="edit-input-row">
										<Field
											name="location"
											label="Location"
											component={renderTextField}
											type="text"
										/>
										<Field
											name="salary"
											label="Salary"
											component={renderTextField}
											type="text"
										/>
									</div>
									<div className="edit-input-row">
										<Field
											name="origin"
											label="Opportunity Source"
											component={renderTextField}
											type="text"
										/>
										<Field
											name="appLink"
											label="Application Link"
											component={renderTextField}
											type="text"
										/>
									</div>
									<div className="edit-input-row">
										<Field
											name="status"
											label="Status"
											component={renderSelectField}
											type="text"
										>
											<MenuItem value={1} primaryText="Interested" />
											<MenuItem value={2} primaryText="Applied" />
											<MenuItem value={3} primaryText="Interviewing" />
											<MenuItem value={4} primaryText="Received Offer" />
										</Field>
										<Field
											name="priority"
											label="Priority"
											component={renderSelectField}
											type="text"
										>
											<MenuItem value={1} primaryText="Low" />
											<MenuItem value={2} primaryText="Medium" />
											<MenuItem value={3} primaryText="High" />
										</Field>
									</div>
									<div>
										<Field
											name="lastUpdate"
											label="Last Update"
											component={renderDatePicker}
											type="text"
										/>
									</div>
								</div>
							</CardText>
						</Card>
						<Card>
							<CardHeader
								title="Company/Job Descriptions"
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<CardText expandable={true}>
								<div className="edit-fields-wrapper">
									<div className="edit-input-row">
										<Field
											name="jobDescription"
											label="Job Description"
											component={renderTextAreaField}
											type="text"
											style={{ width: "100%" }}
										/>
									</div>
									<div className="edit-input-row">
										<Field
											name="responsibilities"
											label="Responsibilities"
											component={renderTextAreaField}
											type="text"
											style={{ width: "100%" }}
										/>
									</div>
									<div className="edit-input-row">
										<Field
											name="qualifications"
											label="Qualifications"
											component={renderTextAreaField}
											type="text"
											style={{ width: "100%" }}
										/>
									</div>
									<div className="edit-input-row">
										<Field
											name="companyDescription"
											label="Company Description"
											component={renderTextAreaField}
											type="text"
											style={{ width: "100%" }}
										/>
									</div>
									<div className="edit-input-row">
										<Field
											name="tags"
											label="Summary Tags"
											component={renderTextAreaField}
											type="text"
											style={{ width: "100%" }}
										/>
									</div>
								</div>
							</CardText>
						</Card>
						<Card>
							<CardHeader
								title="Recruiter Information"
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<CardText expandable={true}>
								<div className="edit-fields-wrapper">
									<div className="edit-input-row">
										<Field
											name="contactName"
											label="Recruiter Name"
											component={renderTextField}
											type="text"
										/>
										<Field
											name="contactEmail"
											label="Recruiter Email"
											component={renderTextField}
											type="text"
										/>
									</div>
									<div className="edit-input-row">
										<Field
											name="contactPhone"
											label="Recruiter Phone"
											component={renderTextField}
											type="text"
										/>
										<Field
											name="lastContact"
											label="Last Contact"
											component={renderDatePicker}
										/>
									</div>
								</div>
							</CardText>
						</Card>
						<Card>
							<CardHeader
								title="Documents"
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<CardText expandable={true}>
								<div className="edit-fields-wrapper">
									<div className="edit-input-row">
										<div className="edit-file-upload">
											<h4>Resume: </h4>
											<p>
												{values.resume
													? values.resume.name
														? values.resume.name
														: values.resumeFileName
													: ""}
											</p>
											<Field name="resume" component={FileInput} />
										</div>
										<div className="edit-file-upload">
											<h4>Cover Letter: </h4>
											<p>
												{values.coverLetter
													? values.coverLetter.name
														? values.coverLetter.name
														: values.coverLetterFileName
													: ""}
											</p>
											<Field name="coverLetter" component={FileInput} />
										</div>
									</div>
								</div>
							</CardText>
						</Card>
						<Card>
							<CardHeader
								title="Misc"
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<CardText expandable={true}>
								<div className="edit-fields-wrapper">
									<div className="edit-input-row">
										<Field
											name="notes"
											label="Notes"
											component={renderTextAreaField}
											type="text"
											style={{ width: "100%" }}
										/>
									</div>
								</div>
							</CardText>
						</Card>
						<div className="edit-page-btns">
							<Link to={`/opp/${_id}`}>
									<FlatButton label="Cancel" style={{ marginRight: 12 }} />
							</Link>
							{!this.state.submitted ? (
								<RaisedButton
									type="submit"
									label="Save"
									backgroundColor="#34A853"
									labelColor="#fff"
								/>
							) : (
								<RaisedButton
									type="submit"
									label="Save"
									backgroundColor="#34A853"
									labelColor="#fff"
									disabled={true}
								/>
							)}
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ opps, form }, ownProps) {
	return {
		opp: opps[ownProps.match.params.id],
		initialValues: opps[ownProps.match.params.id],
		formValues: form.oppEditForm
	};
}

export default connect(mapStateToProps, { fetchOppForEdit, editOpp })(
	reduxForm({
		form: "oppEditForm",
		enableReinitialize: true
	})(withRouter(EditOppPage))
);
