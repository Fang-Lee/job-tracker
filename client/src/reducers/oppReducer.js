import _ from 'lodash';
import {
	FETCH_OPPS,
	FETCH_OPP,
	DELETE_OPP,
	ARCHIVE_OPP,
	FETCH_EDIT_OPP,
} from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_OPPS:
		case ARCHIVE_OPP:
			return action.payload;
		case FETCH_OPP:
		case FETCH_EDIT_OPP:
			return { ...state, [action.payload._id]: action.payload };
		case DELETE_OPP:
			return _.omit(state, action.payload);
		default:
			return state;
	}
}
