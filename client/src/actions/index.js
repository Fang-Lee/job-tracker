import axios from 'axios';
import { FETCH_USER, FETCH_OPPS, FETCH_OPP } from './types';

// fetchs currently logged in user, returns false if no user logged in.
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
}

// submitting survey
export const submitForm = (values, history) => async dispatch => {
	const res = await axios.post('/api/opp', values);
	history.push('/dashboard');
	dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchOpps = () => async dispatch => {
	const res = await axios.get('/api/opps');
	dispatch({ type: FETCH_OPPS, payload: res.data })
}

export const fetchOpp = (id) => async dispatch => {
	const res = await axios.get(`/api/opp/${id}`);
	dispatch({ type: FETCH_OPP, payload: res.data })
}