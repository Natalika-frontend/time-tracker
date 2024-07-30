import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	margin: ${({ margin = '0' }) => margin};
	color: #ede7f6;
	border: 1px solid #ede7f6;
	border-radius: 5px;
	background-color: ${({ disabled }) => (disabled ? '#8b6c9f' : '#4a148c')};
	text-align: center;
	align-content: center;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		background-color: #ac4dec;
	}
`;
