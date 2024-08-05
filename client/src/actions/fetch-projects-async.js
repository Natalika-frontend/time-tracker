import { fetchProjectsRequest } from './fetch-projects-request';
import { request } from '../utils';
import { PAGINATION_LIMIT } from '../constants';
import { fetchProjectsSuccess } from './fetch-projects-success';
import { fetchProjectsFailure } from './fetch-projects-failure';

export const fetchProjectsAsync = (searchPhrase, page) => {
	return (dispatch) => {
		dispatch(fetchProjectsRequest());
		request(
			`/projects?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
		)
			.then(({ data: { projects, lastPage } }) => {
				dispatch(fetchProjectsSuccess(projects, lastPage));
			})
			.catch((error) => {
				dispatch(fetchProjectsFailure(error.message));
			});
	};
};
