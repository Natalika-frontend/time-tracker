import styled from 'styled-components';
import { Icon } from '../icon/icon';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	const pages = [];

	const generatePages = () => {
		if (lastPage <= 3) {
			for (let i = 1; i <= lastPage; i++) {
				pages.push(i);
			}
		} else {
			if (page <= 2) {
				pages.push(1, 2, 3, '...');
			} else if (page >= lastPage - 1) {
				pages.push('...', lastPage - 2, lastPage - 1, lastPage);
			} else {
				pages.push('...', page - 1, page, page + 1, '...');
			}
		}
	};

	generatePages();

	return (
		<div className={className}>
			<div className="pagination">
				<Icon
					id="fa-chevron-left"
					onClick={() => page > 1 && setPage(page - 1)}
				/>
				<div className="page-numbers">
					{pages.map((p, index) =>
						p === '...' ? (
							<span key={index} className="ellipsis">
								...
							</span>
						) : (
							<div
								key={index}
								className={`page-number ${p === page ? 'current' : ''}`}
								onClick={() => setPage(p)}
							>
								{p}
							</div>
						)
					)}
				</div>
				<Icon
					id="fa-chevron-right"
					onClick={() => page < lastPage && setPage(page + 1)}
				/>
			</div>
		</div>
	);
};
export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	position: absolute;
	padding: 0 35px;
	width: 100%;
	bottom: 100px;

	.pagination {
		display: flex;
		align-items: center;
	}

	.page-numbers {
		display: flex;
		align-items: center;
	}

	.page-number {
		width: 32px;
		height: 32px;
		margin: 0 5px;
		font-size: 18px;
		font-weight: 500;
		line-height: 32px;
		text-align: center;
		border: 1px solid #ffffff;
		cursor: pointer;
		transition:
			background-color 0.3s,
			color 0.3s;

		&.current {
			background-color: #ffffff;
			color: #000000;
			border: 1px solid #ffffff;
		}

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}

	.ellipsis {
		width: 32px;
		height: 32px;
		margin: 0 5px;
		line-height: 32px;
		text-align: center;
	}

	svg {
		cursor: pointer;
		margin: 0 10px;
		transition: color 0.3s;

		&:hover {
			color: #ffffff;
		}
	}
`;
