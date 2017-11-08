import { FETCH_FILE } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_FILE:
			return action.payload;
		default:
			return state;
	}
}