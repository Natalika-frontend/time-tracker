import { Icon } from '../../../../components';
import styled from 'styled-components';

const ItemTeamContainer = ({
	className,
	team,
	handleDetailsTeam,
	handleEditTeam,
	handleDeleteTeam,
}) => {
	return (
		<div className={className}>
			<div className="team-name">
				<h3>{team.name}</h3>
			</div>
			<div className="team-structure">
				<h4>В команде </h4>
				<span>{team.members.length} человек</span>
			</div>
			<div className="icons-container">
				<Icon
					id="fa-eye"
					margin="0 0 0 10px"
					onClick={() => handleDetailsTeam(team.id)}
				/>
				<Icon
					id="fa-pencil-square-o"
					margin="0 0 0 10px"
					onClick={() => handleEditTeam(team.id)}
				/>
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px"
					onClick={() => handleDeleteTeam(team.id)}
				/>
			</div>
		</div>
	);
};

export const ItemTeam = styled(ItemTeamContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	border: 1px solid #b36ac9;
	margin-bottom: 5px;

	& .team-name {
		width: 400px;
	}

	& .team-structure {
		display: flex;
		align-items: center;
		& h4 {
			padding-right: 10px;
		}
	}

	& .icons-container {
		display: flex;
	}
`;
