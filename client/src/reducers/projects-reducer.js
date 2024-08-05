import { ACTION_TYPE } from '../actions';

const initialProjectsState = {
	projects: [],
	currentPage: 1,
	lastPage: 1,
	shouldSearch: false,
	searchPhrase: '',
	isLoading: false,
	showForm: false,
	newProjectData: {
		projectName: '',
		description: '',
		participants: [],
	},
	error: null,
};

export const projectsReducer = (state = initialProjectsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.FETCH_PROJECTS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case ACTION_TYPE.FETCH_PROJECTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				projects: action.payload.projects,
				lastPage: action.payload.lastPage,
			};
		case ACTION_TYPE.FETCH_PROJECTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case ACTION_TYPE.SET_PROJECTS_DATA:
			return {
				...state,
				projects: [...state.projects, action.payload],
			};
		case ACTION_TYPE.SET_PROJECT_PAGE:
			return {
				...state,
				currentPage: action.payload,
			};
		case ACTION_TYPE.SET_SEARCH_PHRASE:
			return {
				...state,
				searchPhrase: action.payload,
			};
		case ACTION_TYPE.SET_SHOULD_SEARCH:
			return {
				...state,
				shouldSearch: action.payload,
			};
		case ACTION_TYPE.TOGGLE_FORM:
			return {
				...state,
				showForm: !state.showForm,
			};
		case ACTION_TYPE.SET_NEW_PROJECT_DATA:
			return {
				...state,
				newProjectData: {
					...state.newProjectData,
					[action.payload.name]: action.payload.value,
				},
			};
		case ACTION_TYPE.DELETE_PROJECT_REQUEST:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case ACTION_TYPE.DELETE_PROJECT_SUCCESS:
			return {
				...state,
				isLoading: false,
				projects: state.projects.filter(
					(project) => project.id !== action.payload
				),
			};
		case ACTION_TYPE.DELETE_PROJECT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
