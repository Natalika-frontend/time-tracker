import styled from 'styled-components';
import { Timer } from '../../../../components';

const UserContentContainer = ({ className }) => {
	return (
		<div className={className}>
			<Timer />
		</div>
	);
};

export const UserContent = styled(UserContentContainer)``;
