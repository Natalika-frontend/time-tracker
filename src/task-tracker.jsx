import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Loader } from './components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	background-color: #f3e5f5;
	margin: 0 auto;
	position: relative;
`;

const Page = styled.div`
	padding: 120px 0 20px;
`;

export const TaskTracker = () => {
	return (
		<AppColumn>
			<header>header</header>
			<Page>
				<Routes>
					<Route path="/" element={<Loader />} />
				</Routes>
			</Page>
			<footer>footer</footer>
		</AppColumn>
	);
};
