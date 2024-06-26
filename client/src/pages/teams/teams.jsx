import styled from 'styled-components';
import { Button, Icon, Input, Loader } from '../../components';
import { ItemTeam } from './components';
import { useEffect, useState } from 'react';
import { request } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../selectors';

const TeamsContainer = ({ className }) => {
	const [teams, setTeams] = useState([]);
	const [loading, setLoading] = useState(true);
	const [creating, setCreating] = useState(false);
	const [error, setError] = useState(null);
	const [editingIndex, setEditingIndex] = useState(-1);
	const [newTeamName, setNewTeamName] = useState('');
	const navigate = useNavigate();
	const user = useSelector(selectUser);

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

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const handleAddNewTeam = async () => {
		setCreating(true);
	};

	const handleCreateTeam = async () => {
		try {
			await request('/teams', 'POST', {
				teamName: newTeamName,
				lead: user.id,
			});

			setNewTeamName('');
			const req = await request('/teams');
			setTeams(req.data || []);
		} catch (error) {
			console.error('Ошибка при создании команды:', error);
		} finally {
			setCreating(false);
		}
	};

	const handleCancel = () => {
		setCreating(false);
		setNewTeamName('');
	};

	const handleDetailsTeam = (teamId) => {
		navigate(`/teams/${teamId}`);
	};

	const handleEditTeam = (index) => {
		setEditingIndex(index);
		setNewTeamName(teams[index].name);
	};

	const handleSaveTeamName = async (teamId) => {
		try {
			await request(`/teams/${teamId}`, 'PATCH', {
				teamName: newTeamName,
			});
			const updatedTeams = [...teams];
			updatedTeams[editingIndex].name = newTeamName;
			setTeams(updatedTeams);
			setEditingIndex(-1);
			setNewTeamName('');
		} catch (error) {
			console.error('Ошибка при изменении названия команды:', error);
		}
	};

	const handleCancelEdit = () => {
		setEditingIndex(-1);
		setNewTeamName('');
	};

	const handleDeleteTeam = async (teamId) => {
		try {
			await request(`/teams/${teamId}`, 'DELETE');
			setTeams(teams.filter((team) => team.id !== teamId));
		} catch (error) {
			console.error('Ошибка при удалении команды:', error);
		}
	};

	return (
		<div className={className}>
			<div className="teams-content-header">
				<h2>Все мои команды</h2>
				<Button width="150px" onClick={handleAddNewTeam}>
					Создать
				</Button>
			</div>
			{creating && (
				<div className="create-team-form">
					<Input
						value={newTeamName}
						onChange={(e) => setNewTeamName(e.target.value)}
						placeholder="Название команды"
					/>
					<div>
						<Button onClick={handleCreateTeam} width="150px">
							Создать
						</Button>
						<Button onClick={handleCancel} width="150px">
							Отмена
						</Button>
					</div>
				</div>
			)}
			<div className="teams-list">
				{teams.map((team, index) => (
					<div className="container" key={team.id}>
						{editingIndex === index ? (
							<div className="edit-team-form">
								<input
									type="text"
									value={newTeamName}
									onChange={(e) =>
										setNewTeamName(e.target.value)
									}
								/>
								<div className="edit-icons-container">
									<Icon
										id="fa-floppy-o"
										margin="0 0 0 10px"
										onClick={() =>
											handleSaveTeamName(team.id)
										}
									/>
									<Icon
										id="fa-times-circle-o"
										margin="0 0 0 10px"
										onClick={handleCancelEdit}
									/>
								</div>
							</div>
						) : (
							<ItemTeam
								team={team}
								handleDetailsTeam={handleDetailsTeam}
								handleEditTeam={() => handleEditTeam(index)}
								handleDeleteTeam={handleDeleteTeam}
							/>
						)}
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

	& .create-team-form {
		display: flex;
		align-items: center;
		width: 100%;
		height: 85px;
		padding: 10px;
		border: 1px solid #4a148c;
		justify-content: space-between;
		margin-bottom: 5px;

		& input {
			width: 400px;
			margin-top: 20px;
		}
	}

	& .teams-content-header {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		padding: 0 30px;
	}

	& .teams-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& .edit-team-form {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 85px;
		padding: 10px;
		border: 1px solid #b36ac9;
		margin-bottom: 5px;

		& .edit-icons-container {
			display: flex;
		}

		& input {
			height: 50px;
			width: 400px;
			padding: 10px;
			font-size: 16px;
			color: #4a148c;
		}
	}

	& .container {
		width: 100%;
	}
`;
