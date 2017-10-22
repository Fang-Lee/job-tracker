import _ from 'lodash';
import { FETCH_OPPS, FETCH_OPP, DELETE_OPP } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_OPPS:
			return action.payload;
		case FETCH_OPP:
			return {...state, [action.payload._id]: action.payload}
		case DELETE_OPP:
			return _.omit(state, action.payload);
		default:
			return state;
	}
}