import styled from 'styled-components';

const TeamContainer = ({ className }) => {
	return (
		<div className={className}>
			<h2>Имя команды</h2>
			<div>
				<h3>Участники:</h3>
			</div>
			<div>
				<h3>Проекты:</h3>
			</div>
		</div>
	);
};

export const Team = styled(TeamContainer)`
	display: flex;
	align-items: center;
	width: 100%;
`;
