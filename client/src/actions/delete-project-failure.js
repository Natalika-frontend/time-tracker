import { ACTION_TYPE } from './action-types';

export const deleteProjectFailure = (error) => ({
	type: ACTION_TYPE.FETCH_PROJECTS_FAILURE,
	payload: error,
});
