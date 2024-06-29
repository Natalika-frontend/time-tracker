import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ROLE } from '../../../../constants/role';
import { useSelector } from 'react-redux';
import { selectUserRole, selectUserTeams } from '../../../../selectors';

const MenuContainer = ({ className }) => {
	const userRole = useSelector(selectUserRole);
	const userTeams = useSelector(selectUserTeams);

	const menuItems = [
		{ to: '/', label: 'Главная' },
		{ to: '/projects', label: 'Проекты' },
		{ to: '/analytics', label: 'Аналитика' },
	];

	if (userRole === ROLE.TEAMLEAD) {
		menuItems.push({ to: '/teams', label: 'Команды' });
	}

	if (userTeams.length > 0) {
		menuItems.push({ to: '/team-members', label: 'Состав команды' });
	}

	return (
		<div className={className}>
			{menuItems.map((item, index) => (
				<NavLink key={index} to={item.to} className="menu-link">
					{item.label}
				</NavLink>
			))}
		</div>
	);
};

export const Menu = styled(MenuContainer)`
	& .menu-link {
		padding-left: 30px;
		padding-right: 20px;
		color: #4a148c;
		text-decoration: none;
	}

	& .menu-link.active {
		color: #ffffff;
		position: relative;
		z-index: 100;
	}

	& .menu-link.active::before {
		content: '';
		position: absolute;
		top: -13px;
		right: -7px;
		width: 100%;
		height: 250%;
		background-color: #4a148c;
		border: 1px solid #4a148c;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		z-index: -1;
	}

	& .menu-link.active::after {
		content: '';
		position: absolute;
		width: 135%;
		top: 39px;
		right: -27px;
		border-bottom: 3px solid #4a148c;
		border-top-left-radius: 100%;
		border-top-right-radius: 100%;
		z-index: -1;
	}
`;
