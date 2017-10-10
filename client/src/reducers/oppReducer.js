import { FETCH_OPPS, FETCH_OPP } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_OPPS:
			return action.payload;
		case FETCH_OPP:
			return {...state, [action.payload._id]: action.payload}
		default:
			return state;
	}
}