import styled from 'styled-components';
import { Icon } from '../../../icon/icon';

const ControlPanelContainer = ({ className }) => {
	return (
		<div className={className}>
			<Icon id="fa-user-circle-o" margin="0 10px 0 0" />
			<div>UserName</div>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
`;
