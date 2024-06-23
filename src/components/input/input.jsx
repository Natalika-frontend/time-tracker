import styled from 'styled-components';
import { forwardRef } from 'react';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

InputContainer.displayName = 'InputContainer';

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 50px;
	margin: 0 0 20px;
	padding: 10px;
	border: 1px solid #ffffff;
	font-size: 18px;
`;
