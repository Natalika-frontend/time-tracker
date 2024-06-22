import styled from 'styled-components';
import { Icon } from '../icon/icon';

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			По вопросам разработки сайта обращайтесь:
			<a
				className="footer-link"
				href="https://t.me/Natalyaroma"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon id="fa-telegram" margin="0 10px 0 0" />
				@Natalyaroma
			</a>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 50px;
	padding: 20px;
	position: relative;
	z-index: 1;

	&::before {
		content: '';
		position: absolute;
		left: 0;
		bottom: 100%;
		width: 100%;
		height: 2px;
		background-color: #7b1fa2; /* Цвет линии */
	}

	& .footer-link {
		display: flex;
		align-items: center;
		padding: 10px;
	}
`;
