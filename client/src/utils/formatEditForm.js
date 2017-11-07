export function formatEditForm(values) {
	console.log('modify these values for edit', values);
	values.tags = values.tags.join();
	if (values.resume) {
		let pathArray = values.resume.split('/');
		values.resumeFileName = pathArray[pathArray.length - 1];
		values.oldResume = values.resume;
	}
	if (values.coverLetter) {
		let pathArray = values.coverLetter.split('/');
		values.coverLetterFileName = pathArray[pathArray.length - 1];
		values.oldCoverLetter = values.coverLetter;
	}
	return values;
}