import styled from 'styled-components';
import { GuestContent } from './components';

const MainContainer = ({ className }) => {
	return (
		<div className={className}>
			<GuestContent />
		</div>
	);
};

export const Main = styled(MainContainer)``;
