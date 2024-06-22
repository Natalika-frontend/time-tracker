import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Footer, Header, Loader } from './components';
import { Main } from './pages/main/main';

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
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/projects" element={<div>Проекты</div>} />
					<Route path="/analytics" element={<div>Аналитика</div>} />
					<Route path="/login" element={<div>Логин</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	);
};
