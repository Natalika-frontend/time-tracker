import { ACTION_TYPE } from './action-types';

export const setShouldSearch = (shouldSearch) => ({
	type: ACTION_TYPE.SET_SHOULD_SEARCH,
	payload: shouldSearch,
});
