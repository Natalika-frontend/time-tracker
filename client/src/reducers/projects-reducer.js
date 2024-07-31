import { ACTION_TYPE } from '../actions';

const initialProjectsState = {
	projects: [],
	loading: false,
	error: null,
	page: 1,
	lastPage: 1,
	searchPhrase: '',
};

export const projectsReducer = (state = initialProjectsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECTS_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.CREATE_PROJECT:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
