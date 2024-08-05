import { ACTION_TYPE } from './action-types';

export const setProjectData = (projectData) => ({
	type: ACTION_TYPE.SET_PROJECTS_DATA,
	payload: projectData,
});
