import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MenuContainer = ({ className }) => {
	return (
		<div className={className}>
			<NavLink to="/" className="menu-link">
				Главная
			</NavLink>
			<NavLink to="/projects" className="menu-link">
				Проекты
			</NavLink>
			<NavLink to="/analytics" className="menu-link">
				Аналитика
			</NavLink>
		</div>
	);
};

export const Menu = styled(MenuContainer)`
	& .menu-link {
		padding-left: 30px;
		padding-right: 20px;
	}

	& .menu-link.active {
		text-decoration: underline;
		color: #4a148c; /* Цвет подчеркнутого пункта меню */
	}
`;
