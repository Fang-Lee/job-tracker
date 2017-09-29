// input fields for the new opportunity form
import React from 'react';

// nested destructuring for meta properties
export default ({ input, name, label, style, meta: { error, touched } }) => {
	return (
		<div style={style}>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
