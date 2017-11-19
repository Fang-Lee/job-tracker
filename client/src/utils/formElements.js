// generating any redux form fields with material-ui, all forms can use these funcitons to render fields

import React from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import DatePicker from "material-ui/DatePicker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { grey600, grey800 } from "material-ui/styles/colors";

const datePickerTheme = getMuiTheme({
	datePicker: {
		selectColor: grey600,
		headerColor: grey800
	}
});

export const renderTextField = ({
	input,
	label,
	meta: { touched, error },
	...custom
}) => (
	<TextField
		floatingLabelText={label}
		errorText={touched && error}
		hintText={custom.hint}
		{...input}
		{...custom}
	/>
);

export const renderTextAreaField = ({ input, label, meta, ...custom }) => (
	<TextField
		floatingLabelText={label}
		multiLine={true}
		rows={2}
		rowsMax={4}
		{...input}
		{...custom}
		hintText={custom.hint}
	/>
);

export const renderSelectField = ({
	input,
	label,
	meta: { touched, error },
	children,
	...custom
}) => (
	<SelectField
		floatingLabelText={label}
		{...input}
		onChange={(event, index, value) => input.onChange(value)}
		children={children}
		{...custom}
		hintText={custom.hint}
		errorText={touched && error}
	/>
);

export const renderDatePicker = ({ input, label, meta, ...custom }) => (
	<MuiThemeProvider muiTheme={datePickerTheme}>
		<DatePicker
			floatingLabelText={label}
			container="inline"
			onChange={(event, date) => input.onChange(date)}
			autoOk={true}
		/>
	</MuiThemeProvider>
);
