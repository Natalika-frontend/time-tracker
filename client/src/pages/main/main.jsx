import styled from 'styled-components';
import { GuestContent, UserContent } from './components';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants/role';

const MainContainer = ({ className }) => {
	const userRole = useSelector(selectUserRole);
	return (
		<div className={className}>
			{userRole === ROLE.GUEST ? <GuestContent /> : <UserContent />}
		</div>
	);
};

export const Main = styled(MainContainer)``;
