import { ACTION_TYPE } from '../actions';

const initialTeamsState = {
	teams: [],
	currentPage: 1,
	lastPage: 1,
	shouldSearch: false,
	searchPhrase: '',
	isLoading: false,
	showForm: false,
	newTeamData: {
		teamName: '',
		description: '',
		participants: [],
	},
	error: null,
};

export const teamsReducer = (state = initialTeamsState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
