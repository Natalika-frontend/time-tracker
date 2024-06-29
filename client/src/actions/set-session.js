import { ACTION_TYPE } from './action-types';

export const setSession = (session) => ({
	type: ACTION_TYPE.SET_SESSION,
	payload: session,
});
