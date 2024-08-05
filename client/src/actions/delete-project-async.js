import { deleteProjectRequest } from './delete-project-request';
import { request } from '../utils';
import { deleteProjectSuccess } from './delete-project-success';
import { deleteProjectFailure } from './delete-project-failure';

export const deleteProjectAsync = (projectId) => async (dispatch) => {
	dispatch(deleteProjectRequest());

	try {
		await request(`/projects/${projectId}`, 'DELETE');
		dispatch(deleteProjectSuccess(projectId));
	} catch (error) {
		dispatch(deleteProjectFailure(error));
	}
};
