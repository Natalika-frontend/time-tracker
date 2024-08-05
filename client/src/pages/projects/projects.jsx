import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Button, Icon, Input, Loader, Pagination } from '../../components';
import { debounce } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
	createProjectAsync,
	deleteProjectAsync,
	fetchProjectsAsync,
	setNewProjectData,
	setProjectPage,
	toggleForm,
} from '../../actions';
import { Modal, Search } from './components';
import { useNavigate } from 'react-router-dom';
import {
	selectIsLoading,
	selectLastPage,
	selectNewProjectData,
	selectCurrentPage,
	selectProjects,
	selectSearchPhrase,
	selectShouldSearch,
	selectShowForm,
} from '../../selectors';

const ProjectsContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const projects = useSelector(selectProjects);
	const currentPage = useSelector(selectCurrentPage);
	const lastPage = useSelector(selectLastPage);
	const shouldSearch = useSelector(selectShouldSearch);
	const searchPhrase = useSelector(selectSearchPhrase);
	const isLoading = useSelector(selectIsLoading);
	const showForm = useSelector(selectShowForm);
	const newProjectData = useSelector(selectNewProjectData);

	useEffect(() => {
		dispatch(fetchProjectsAsync(searchPhrase, currentPage));
	}, [currentPage, shouldSearch, searchPhrase, dispatch]);

	const startDelayedSearch = useMemo(() =>
		debounce((value) => dispatch(shouldSearch(value)), 3000, [dispatch])
	);

	const onSearch = ({ target }) => {
		dispatch(searchPhrase(target.value));
		startDelayedSearch(!shouldSearch);
	};

	if (isLoading) return <Loader />;

	const onAddProjectClick = () => {
		dispatch(toggleForm());
	};

	const handleCancel = () => {
		dispatch(toggleForm());
	};

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		dispatch(setNewProjectData(name, value));
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		dispatch(createProjectAsync(null, newProjectData)).then(() => {
			dispatch(fetchProjectsAsync(searchPhrase));
			dispatch(toggleForm());
		});
	};

	const handleDetailsProject = (projectId) => {
		navigate(`/projects/${projectId}`);
	};

	const handleDeleteProject = async (projectId) => {
		dispatch(deleteProjectAsync(projectId));
	};

	const handlePageChange = (page) => {
		dispatch(setProjectPage(page));
	};

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			<div className="all-projects-header">
				<div>
					<h3>Все проекты</h3>
				</div>
				<Button onClick={onAddProjectClick} width="150px">
					Создать
				</Button>
			</div>
			<Modal show={showForm} onClose={handleCancel}>
				<h2>Создать проект</h2>
				<form className="add-project-form" onSubmit={handleSubmit}>
					<div>
						<label>Название проекта</label>
						<Input
							type="text"
							name="projectName"
							value={newProjectData.projectName || ''}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label>Описание проекта</label>
						<Input
							type="text"
							name="description"
							value={newProjectData.description || ''}
							onChange={handleChange}
						/>
					</div>
					<div className="form-buttons">
						<Button type="button" onClick={handleCancel}>
							Отмена
						</Button>
						<Button type="submit" margin="0 0 0 10px">
							Создать проект
						</Button>
					</div>
				</form>
			</Modal>
			<div className="project-list">
				<div className="projects-items-header">
					<div className="all-projects-name">Название проекта</div>
					<div className="all-projects-description">
						Описание проекта
					</div>
				</div>
				{projects.map((project) => (
					<div key={project.id} className="project-item">
						<div className="all-projects-name">
							{project.projectName}
						</div>
						<div className="all-projects-description">
							{project.description}
						</div>
						<div className="all-projects-icons">
							<Icon
								id="fa-eye"
								margin="0 0 0 10px"
								onClick={handleDetailsProject}
							/>
							<Icon
								id="fa-pencil-square-o"
								margin="0 0 0 10px"
								onClick={() => console.log('Edit', project.id)}
							/>
							<Icon
								id="fa-trash-o"
								margin="0 0 0 10px"
								onClick={() => handleDeleteProject(project.id)}
							/>
						</div>
					</div>
				))}
			</div>

			{lastPage > 1 && projects.length > 0 && (
				<Pagination
					page={currentPage}
					lastPage={lastPage}
					setPage={handlePageChange}
				/>
			)}
		</div>
	);
};

export const Projects = styled(ProjectsContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	.all-projects-header {
		width: 100%;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.projects-items-header {
		display: flex;
		font-weight: bold;
		font-size: 18px;
		margin: 10px 0;
		padding: 10px;
		border: 1px solid #e2a8f3;
		border-radius: 4px;
	}

	.project-list {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.project-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 10px 0;
		padding: 10px;
		border: 1px solid #e2a8f3;
		border-radius: 4px;
		background-color: #ecd8f3;
	}

	.all-projects-name {
		width: 200px;
	}

	.all-projects-description {
		display: flex;
		font-style: italic;
		width: 670px;
		align-items: center;
		justify-content: flex-start;
	}

	.all-projects-icons {
		display: flex;
	}

	.project-form {
		margin: 20px 0;
		padding: 0 20px 20px 20px;
		border: 1px solid #e2a8f3;
		border-radius: 4px;
	}

	.add-project-form {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		& .form-buttons {
			display: flex;
			width: 100%;
		}

		& label {
			margin: 0 10px 0 0;
		}
		& input {
			width: 350px;
			margin: 0 0 10px 0;
			font-size: 18px;
		}
	}

	.pagination {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
`;
