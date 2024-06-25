import styled from 'styled-components';
import { ControlPanel, Menu } from './components';

const HeaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<Menu />
			<ControlPanel />
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
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
`;
