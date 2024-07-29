import { ACTION_TYPE } from './action-types';

export const setProjectData = (projectData) => ({
	type: ACTION_TYPE.RESET_PROJECT_DATA,
	payload: projectData,
});
