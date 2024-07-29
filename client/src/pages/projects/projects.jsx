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

	return (
		<div className={className}>
			<Button onClick={() => console.log('Создать проект')} width="150px">
				Создать
			</Button>
			<div className="project-list">
				{projects.map((project) => (
					<div key={project.id} className="project-item">
						<div>{project.projectName}</div>
						<div>{project.description}</div>
						<Icon
							id="fa-pencil-square-o"
							onClick={() => console.log('Edit', project.id)}
						/>
						<Icon
							id="fa-trash-o"
							onClick={() => console.log('Delete', project.id)}
						/>
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

	.project-list {
		display: flex;
		flex-direction: column;
	}

	.project-item {
		display: flex;
		justify-content: space-between;
		margin: 10px 0;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.pagination {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
`;
