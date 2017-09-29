import axios from 'axios';
import { FETCH_USER } from './types';

// fetchs currently logged in user, returns false if no user logged in.
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
}