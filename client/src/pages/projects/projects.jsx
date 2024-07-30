import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, Loader, Pagination } from '../../components';
import { debounce, request } from '../../utils';
import { PAGINATION_LIMIT } from '../../constants';

const ProjectsContainer = ({ className }) => {
	const [projects, setProjects] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		request(
			`/projects?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
		).then(({ data: { projects, lastPage } }) => {
			setProjects(projects);
			setLastPage(lastPage);
			setIsLoading(false);
		});
	}, [page, shouldSearch, searchPhrase]);

	const startDelayedSearch = useMemo(() =>
		debounce(setShouldSearch, 2000, [])
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	if (isLoading) return <Loader />;

	const onAddProjectClick = () => {
		console.log('click');
	};

	return (
		<div className={className}>
			<div className="all-projects-header">
				<div>
					<h3>Все проекты</h3>
				</div>
				<Button onClick={onAddProjectClick} width="150px">
					Создать
				</Button>
			</div>
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
								onClick={() =>
									console.log('details', project.id)
								}
							/>
							<Icon
								id="fa-pencil-square-o"
								margin="0 0 0 10px"
								onClick={() => console.log('Edit', project.id)}
							/>
							<Icon
								id="fa-trash-o"
								margin="0 0 0 10px"
								onClick={() =>
									console.log('Delete', project.id)
								}
							/>
						</div>
					</div>
				))}
			</div>

			{lastPage > 1 && projects.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
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
		font-style: normal important;
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

	.pagination {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
`;
