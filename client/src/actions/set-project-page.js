import { ACTION_TYPE } from './action-types';

export const setProjectPage = (page) => ({
	type: ACTION_TYPE.SET_PROJECT_PAGE,
	payload: page,
});
