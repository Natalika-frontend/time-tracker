import { ACTION_TYPE } from './action-types';

export const fetchProjectsSuccess = (projects, lastPage) => ({
	type: ACTION_TYPE.FETCH_PROJECTS_SUCCESS,
	payload: { projects, lastPage },
});
