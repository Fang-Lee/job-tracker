import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import oppReducer from './oppReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	opps: oppReducer
});
