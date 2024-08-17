import { ACTION_TYPE } from './action-types';

export const fetchTeamsSuccess = (projects, lastPage) => ({
	type: ACTION_TYPE.FETCH_TEAMS_SUCCESS,
	payload: { projects, lastPage },
});
