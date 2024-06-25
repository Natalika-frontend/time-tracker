import styled from 'styled-components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';
import { Login, Main, Registration } from './pages';

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

export const TimeTracker = () => {
	const location = useLocation();
	const isAuthPage =
		location.pathname === '/login' || location.pathname === '/register';

	return (
		<>
			{!isAuthPage && (
				<AppColumn>
					<Header />
					<Page>
						<Routes>
							<Route path="/" element={<Main />} />
							<Route
								path="/projects"
								element={<div>Проекты</div>}
							/>
							<Route
								path="/analytics"
								element={<div>Аналитика</div>}
							/>
							<Route
								path="/projects/:id"
								element={<div>Проект</div>}
							/>
						</Routes>
					</Page>
					<Footer />
				</AppColumn>
			)}
			{isAuthPage && (
				<Routes>
					<Route>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />
					</Route>
				</Routes>
			)}
		</>
	);
};
