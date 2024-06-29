import styled from 'styled-components';

const UserContentContainer = ({ className }) => {
	return <div className={className}>Контент пользователя</div>;
};

export const UserContent = styled(UserContentContainer)``;
