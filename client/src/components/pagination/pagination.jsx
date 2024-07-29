import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<div className="pagination">
				<Icon
					id="fa-chevron-left"
					onClick={() => console.log('Previous')}
				/>
				<Icon
					id="fa-chevron-right"
					onClick={() => console.log('Next')}
				/>
			</div>
		</div>
	);
};
export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	position: absolute;
	margin: 0 0 20px;
	padding: 0 35px;
	width: 100%;
	bottom: 120px;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		width: 100%;
		height: 32px;
		margin: 0 5px;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
		text-align: center;
		border: 1px solid #ffffff;
	}
`;
