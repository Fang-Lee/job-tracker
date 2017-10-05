// generating any redux form fields with material-ui, all forms can use these funcitons to render fields

import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey600, grey800 } from 'material-ui/styles/colors';
import { Rating } from 'material-ui-rating';
import { ToggleStar, ToggleStarBorder } from 'material-ui/svg-icons';

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
	meta,
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
	/>
);

export const renderDatePicker = ({ input, label, meta, ...custom }) => (
	<MuiThemeProvider muiTheme={datePickerTheme}>
		<DatePicker
			floatingLabelText={label}
			container="inline"
			onChange={(event, date) => input.onChange(date)}
		/>
	</MuiThemeProvider>
);

export const renderStarRater = ({ input, label, meta, ...custom }) => {
	console.log(custom);
	return(
	<Rating
		value={custom.rating}
		max={5}
		onChange={(value) => console.log('value is ' + value)}
		iconFilled={<ToggleStar color={grey800} />}
		iconHovered={<ToggleStarBorder color={grey800} />}
	/>
)};
