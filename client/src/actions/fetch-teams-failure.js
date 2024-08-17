import { ACTION_TYPE } from './action-types';

export const fetchTeamsFailure = (error) => ({
	type: ACTION_TYPE.FETCH_TEAMS_FAILURE,
	payload: error,
});
