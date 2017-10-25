import axios from 'axios';
import {
	FETCH_USER,
	FETCH_OPPS,
	FETCH_OPP,
	DELETE_OPP,
	EDIT_OPP
} from './types';
import { formatFormValues } from '../utils/formatFormValues';

// fetchs currently logged in user, returns false if no user logged in.
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

// submitting survey
export const submitForm = (values, history) => async dispatch => {
	// files cannot be parsed by body-parser so have to use middleware called multer.
	// for multer to read files, must be placed inside formData
	const formatedValues = formatFormValues(values);
	const res = await axios.put('/api/opp', formatedValues);
	console.log('values', formatedValues);
	console.log(res.data);
	history.push(res.data.redirect);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchOpps = () => async dispatch => {
	const res = await axios.get('/api/opps');
	dispatch({ type: FETCH_OPPS, payload: res.data });
};

export const fetchOpp = id => async dispatch => {
	const res = await axios.get(`/api/opp/${id}`);
	dispatch({ type: FETCH_OPP, payload: res.data });
};

export const deleteOpp = (id, history) => async dispatch => {
	const res = await axios.delete(`/api/delete/opp/${id}`);
	console.log('res from delete', res);
	history.push(res.data.redirect);
	dispatch({ type: DELETE_OPP, payload: res.data.opp });
};

export const archiveOpp = (id, history) => async dispatch => {
	const res = await axios.post(`/api/archive/opp/${id}`);
	console.log('res from archive', res);
	history.push(res.data.redirect);
	dispatch({ type: EDIT_OPP, payload: res.data });
};
