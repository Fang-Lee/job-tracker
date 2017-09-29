import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
	switch(action.type) {
		case FETCH_USER:
			return action.payload || false; // return user if logged in, else return false
		default:
			return state;
	}
}