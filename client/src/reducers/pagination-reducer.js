import { ACTION_TYPE } from '../actions';

const initialPaginationState = {
	lastPage: 1,
	currentPage: 1,
};

export const paginationReducer = (state = initialPaginationState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PAGE:
			return {
				...state,
				currentPage: action.payload,
			};
		case ACTION_TYPE.FETCH_PROJECTS_SUCCESS:
			return {
				...state,
				lastPage: action.payload.lastPage,
			};
		default:
			return state;
	}
};
