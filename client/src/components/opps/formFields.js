import {
	renderTextField,
	renderTextAreaField,
	renderSelectField,
	renderDatePicker
} from '../../utils/formElements';

const styles = {
	fullWidth: { width: '100%' },
	halfWidth: { width: '47.5%' },
	thirdWidth: { width: '30%' },
	quarterWidth: { width: '23%' }
};

const formFields = [
	{
		type: 'subHeader',
		label: 'Company/Job Description',
		style: styles.fullWidth
	},
	{
		type: 'textField',
		label: 'Company Name*',
		name: 'company',
		component: renderTextField,
		style: styles.halfWidth,
		noValueError: 'You must enter a company.'
	},
	{
		type: 'textField',
		label: 'Job Title*',
		name: 'jobTitle',
		component: renderTextField,
		style: styles.halfWidth,
		noValueError: 'You must enter a job title.'
	},
	{
		type: 'textField',
		label: 'Location',
		name: 'location',
		component: renderTextField,
		style: styles.halfWidth,
		hint: 'Optional'
	},
	{
		type: 'textField',
		label: 'Salary',
		name: 'salary',
		component: renderTextField,
		style: styles.halfWidth,
		hint: 'Optional'
	},
	{
		type: 'textField',
		label: 'Where did you find this job?',
		name: 'origin',
		component: renderTextField,
		style: styles.halfWidth,
		hint: 'Ex. Referral, Indeed, LinkedIn'
	},
	{
		type: 'textField',
		label: 'Application Link',
		name: 'appLink',
		component: renderTextField,
		style: styles.halfWidth,
		hint: 'Paste application link here'
	},
	{
		type: 'selectField',
		label: 'Status*',
		name: 'status',
		component: renderSelectField,
		style: styles.halfWidth,
		children: [
			{ value: 1, textLabel: 'Interested' },
			{ value: 2, textLabel: 'Applied' },
			{ value: 3, textLabel: 'Interviewing' },
			{ value: 4, textLabel: 'Received Offer' }
		]
	},
	{
		type: 'selectField',
		label: 'Priority',
		name: 'priority',
		component: renderSelectField,
		style: styles.halfWidth,
		children: [
			{ value: 1, textLabel: 'Low' },
			{ value: 2, textLabel: 'Medium' },
			{ value: 3, textLabel: 'High' }
		]
	},
		{
		type: 'datePicker',
		label: 'Last Update',
		name: 'lastUpdate',
		component: renderDatePicker
	},
	{
		type: 'textAreaField',
		label: 'Job Description',
		name: 'jobDescription',
		component: renderTextAreaField,
		style: styles.fullWidth,
		hint:
			'Short description about the job such as qualifications and/or responsiblites. (Optional)'
	},
	{
		type: 'textAreaField',
		label: 'Responsibilities',
		name: 'responsibilities',
		component: renderTextAreaField,
		style: styles.fullWidth,
		hint: '(optional)'
	},
	{
		type: 'textAreaField',
		label: 'Qualifications',
		name: 'qualifications',
		component: renderTextAreaField,
		style: styles.fullWidth,
		hint: '(optional)'
	},
	{
		type: 'textAreaField',
		label: 'Company Description',
		name: 'companyDescription',
		component: renderTextAreaField,
		style: styles.fullWidth,
		hint: 'Short description about the company. (Optional)'
	},
	{
		type: 'textAreaField',
		label: 'Summary Tags',
		name: 'tags',
		component: renderTextAreaField,
		style: styles.fullWidth,
		hint:
			'Add key phrases describing the job. Separate each with a comma. Ex. (Full-time/Part-time/Internship, Good benefits, Close commute, Cool campus)'
	},
	{
		type: 'subHeader',
		label: 'Recruiter Contact Information (Optional)',
		style: styles.fullWidth
	},
	{
		type: 'textField',
		label: 'Recruiter Name',
		name: 'contactName',
		component: renderTextField,
		style: styles.fullWidth
	},
	{
		type: 'textField',
		label: 'Recruiter Email',
		name: 'contactEmail',
		component: renderTextField,
		style: styles.fullWidth
	},
	{
		type: 'textField',
		label: 'Recruiter Phone Number',
		name: 'contactPhone',
		component: renderTextField,
		style: styles.fullWidth
	},
	{
		type: 'datePicker',
		label: 'Last Contact',
		name: 'lastContact',
		component: renderDatePicker,
		style: styles.fullWidth
	},
	{
		type: 'subHeader',
		label: 'Miscellaneous',
		style: styles.fullWidth
	},
	{
		type: 'textAreaField',
		label: 'Notes',
		name: 'notes',
		component: renderTextAreaField,
		style: styles.fullWidth
	}
];

export default formFields;
