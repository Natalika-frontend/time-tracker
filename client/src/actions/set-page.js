import { ACTION_TYPE } from './action-types';

export const setPage = (page) => ({
	type: ACTION_TYPE.SET_PAGE,
	payload: page,
});
