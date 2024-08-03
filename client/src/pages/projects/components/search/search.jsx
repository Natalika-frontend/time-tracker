import styled from 'styled-components';
import { Icon, Input } from '../../../../components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск проекта..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding-right: 36px;
	}

	& > div {
		position: absolute;
		top: 2px;
		right: 9px;
		font-size: 24px;
	}
`;
