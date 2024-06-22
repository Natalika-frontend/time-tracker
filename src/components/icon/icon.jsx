import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconContainer = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? '#7b1fa2' : '#b55ec1')};

	&:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
		color: ${({ disabled }) => (disabled ? '#7b1fa2' : '#4a148c')};
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	inactive: PropTypes.bool,
};
