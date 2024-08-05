import { ACTION_TYPE } from './action-types';

export const setNewProjectData = (name, value) => ({
	type: ACTION_TYPE.SET_NEW_PROJECT_DATA,
	payload: { name, value },
});
