import { fetchProjectsRequest } from './fetch-projects-request';
import { request } from '../utils';
import { PAGINATION_LIMIT } from '../constants';
import { fetchTeamsFailure } from './fetch-teams-failure';
import { fetchTeamsSuccess } from './fetch-teams-success';
import { fetchTeamsRequest } from './fetch-teams-request';

export const fetchTeamsAsync = (searchPhrase, page) => {
	return (dispatch) => {
		dispatch(fetchTeamsRequest());
		request(
			`/teams?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
		)
			.then(({ data: { teams, lastPage } }) => {
				dispatch(fetchTeamsSuccess(teams, lastPage));
			})
			.catch((error) => {
				dispatch(fetchTeamsFailure(error.message));
			});
	};
};
