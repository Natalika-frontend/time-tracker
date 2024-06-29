import styled from 'styled-components';
import { Icon } from '../../../icon/icon';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, selectUserRole } from '../../../../selectors';
import { Button } from '../../../button/button';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../actions';
import { ROLE } from '../../../../constants/role';

const StyledLink = styled(Link)`
	color: white;
	text-decoration: none;
`;

const ControlPanelContainer = ({ className }) => {
	const UserName = useSelector(selectUserName);
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/');
	};

	return (
		<div className={className}>
			{UserName ? (
				<>
					<Icon id="fa-user-circle-o" margin="0 10px 0 0" />
					<div className="user-name">{UserName}</div>
					{userRole !== ROLE.GUEST && (
						<Icon
							onClick={onLogout}
							id="fa-sign-out"
							margin="0 0 0 10px"
						/>
					)}
				</>
			) : (
				<>
					<Button margin="0 10px 0 0">
						<StyledLink to="/login">Войти</StyledLink>
					</Button>
					<Button>
						<StyledLink to="/register">
							Зарегистрироваться
						</StyledLink>
					</Button>
				</>
			)}
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
	font-size: 18px;

	& .user-name {
		padding: 0 20px 0 0;
	}
`;
