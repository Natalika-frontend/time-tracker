import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Input } from '../../../../components';
import { request } from '../../../../utils';

const TeamContainer = ({ className, team }) => {
	const { teamId } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [teamData, setTeamData] = useState(null);
	const [newMember, setNewMember] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTeam = async () => {
			try {
				const response = await request(`/teams/${teamId}`);
				console.log(response);
				const contentType = response.headers.get('content-type');
				if (contentType && contentType.includes('application/json')) {
					const data = await response.json();
					setTeamData(data);
				} else {
					setError('Некорректный ответ от сервера');
				}
			} catch (error) {
				console.error('Ошибка при получении данных команды:', error);
				setError('Ошибка при загрузке данных команды');
			} finally {
				setLoading(false);
			}
		};

		fetchTeam();
	}, [teamId]);

	const handleDeleteTeam = async () => {
		try {
			await request(`/teams/${teamId}`, 'DELETE');
			navigate('/teams');
		} catch (error) {
			console.error('Ошибка при удалении команды:', error);
		}
	};

	const handleAddMember = async () => {
		try {
			await request(`/teams/${teamId}/members`, 'POST', {
				userId: newMember,
			});
			setNewMember('');
		} catch (error) {
			console.error('Ошибка при добавлении участника:', error);
		}
	};

	const handleRemoveMember = async (memberId) => {
		// добавьте здесь запрос для удаления участника
		try {
			await request(`/teams/${teamId}/members/${memberId}`, 'DELETE');
		} catch (error) {
			console.error('Ошибка при удалении участника:', error);
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
			<h2>{team.name}</h2>
			<div className="members-list">
				<h3>Участники:</h3>
				{team.members.map((member) => (
					<div key={member.id} className="member-item">
						<span>{member.userName}</span>
						<Button onClick={() => handleRemoveMember(member.id)}>
							Удалить
						</Button>
					</div>
				))}
			</div>
			<Input
				value={newMember}
				onChange={(e) => setNewMember(e.target.value)}
				placeholder="Новый участник..."
			/>
			<Button onClick={handleAddMember}>Добавить участника</Button>
			<div className="projects-list">
				<h3>Проекты:</h3>
				{teamData.projects.map((project) => (
					<div key={project.id}>{project.name}</div>
				))}
			</div>
			<Button onClick={handleDeleteTeam}>Удалить команду</Button>
		</div>
	);
};

export const Team = styled(TeamContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;

	& .members-list,
	& .projects-list {
		width: 80%;
		margin: 20px 0;
	}

	& .member-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}
`;
