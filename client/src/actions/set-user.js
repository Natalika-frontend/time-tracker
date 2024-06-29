import { ACTION_TYPE } from './action-types';

export const setUser = (user) => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});
