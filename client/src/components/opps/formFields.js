export default [
	{
		label: 'Company Name',
		name: 'company',
		type: 'text',
		style: {
			width: '47.5%'
		},
		error: 'You must enter a company.'
	},
	{
		label: 'Job Title',
		name: 'title',
		type: 'text',
		style: {
			width: '47.5%'
		},
		error: 'You must enter a job title.'
	},
	{
		label: 'Location',
		name: 'location',
		type: 'text',
	},
	{
		label: 'Job Description (optional)',
		name: 'jobDescription',
		type: 'textarea',
		sytle: {
			width: '100%'
		}
	},
	{
		label: 'Company Description (optional)',
		name: 'companyDescription',
		type: 'textarea'
	}
]
