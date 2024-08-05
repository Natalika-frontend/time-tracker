import { ACTION_TYPE } from './action-types';

export const deleteProjectSuccess = (projectId) => ({
	type: ACTION_TYPE.FETCH_PROJECTS_SUCCESS,
	payload: projectId,
});
