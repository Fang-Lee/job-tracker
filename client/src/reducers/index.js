import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import oppReducer from './oppReducer';
import fileReducer from './fileReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	opps: oppReducer,
	files: fileReducer,
});
