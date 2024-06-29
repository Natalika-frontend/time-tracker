import styled from 'styled-components';
import { ControlPanel, Menu } from './components';
import { ROLE } from '../../constants/role';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';

const HeaderContainer = ({ className, hasMenu }) => {
	const userRole = useSelector(selectUserRole);

	return (
		<div className={className}>
			{userRole !== ROLE.GUEST && <Menu />}
			<div className="control-panel-wrapper">
				<ControlPanel />
			</div>
		</div>
	);
};

const StyledHeader = styled(HeaderContainer)`
	display: flex;
	align-items: center;
	justify-content: ${({ hasMenu }) =>
		hasMenu ? 'space-between' : 'flex-end'};
	height: 60px;
	padding: 10px;
	position: relative;
	z-index: 1;

	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 100%;
		width: 100%;
		height: 2px;
		background-color: #7b1fa2; /* Цвет линии */
	}

	.control-panel-wrapper {
		display: flex;
		justify-content: ${({ hasMenu }) =>
			hasMenu ? 'flex-end' : 'flex-start'};
	}
`;

export const Header = () => {
	const userRole = useSelector(selectUserRole);
	const hasMenu = userRole !== ROLE.GUEST;

	return <StyledHeader hasMenu={hasMenu} />;
};
