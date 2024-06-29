import styled from 'styled-components';
import { Button, Icon } from '../../components';
import { Team } from './components';
import { useEffect, useState } from 'react';
import { request } from '../../utils';
import { useNavigate } from 'react-router-dom';

const TeamsContainer = ({ className }) => {
	const [teams, setTeams] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const req = await request('/teams');
				setTeams(req.data || []);
			} catch (error) {
				console.error('Ошибка при получении списка команд:', error);
				setError('Ошибка при загрузке команд');
			} finally {
				setLoading(false);
			}
		};

		fetchTeams();
	}, []);

	const handleEditTeam = (teamId) => {
		navigate(`/teams/${teamId}`);
	};

	const handleDeleteTeam = async (teamId) => {
		// добавьте здесь запрос для удаления команды
		try {
			await request(`/teams/${teamId}`, 'DELETE');
			setTeams(teams.filter((team) => team.id !== teamId));
		} catch (error) {
			console.error('Ошибка при удалении команды:', error);
		}
	};

	if (loading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className={className}>
			<div className="teams-content-header">
				<h2>Все мои команды</h2>
				<Button width="150px">Создать</Button>
			</div>
			<div className="teams-list">
				{teams.map((team) => (
					<div key={team.id} className="team-item">
						<Team teamId={team.id} team={team} />
						<span>{team.members.length} человек</span>
						<Icon
							id="fa-pencil-square-o"
							onClick={() => handleEditTeam(team.id)}
						>
							Редактировать
						</Icon>
						<Icon
							id="fa-trash-o"
							onClick={() => handleDeleteTeam(team.id)}
						>
							Удалить
						</Icon>
					</div>
				))}
			</div>
			<div>Пагинация</div>
		</div>
	);
};

export const Teams = styled(TeamsContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;

	& .teams-content-header {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	& .teams-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& .team-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}
`;
