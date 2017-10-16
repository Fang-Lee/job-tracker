// formats all values of redux form to allow for files to be parsed.
// files cannot be parsed by body-parser so have to use middleware called multer.
// for multer to read files, must be placed inside formData
export function formatFormValues(values) {
	const formData = new FormData();

	for (const key in values) {
		formData.append(key, values[key]);
	}

	return formData;
}