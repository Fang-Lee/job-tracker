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

const formFieldsShort = [
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
		type: 'textAreaField',
		label: 'Summary Tags',
		name: 'tags',
		component: renderTextAreaField,
		style: styles.fullWidth,
		hint:
			'Add key phrases describing the job. Separate each with a comma. Ex. (Full-time/Part-time/Internship, Good benefits, Close commute, Cool campus)'
	},
	{
		type: 'textAreaField',
		label: 'Notes',
		name: 'notes',
		component: renderTextAreaField,
		style: styles.fullWidth
	},
	{
		type: 'datePicker',
		label: 'Date Applied',
		name: 'dateApplied',
		component: renderDatePicker,
		style: styles.fullWidth,
	}
];

export default formFieldsShort;
