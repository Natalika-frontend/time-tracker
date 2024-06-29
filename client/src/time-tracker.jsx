import styled from 'styled-components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header } from './components';
import { Login, Main, Projects, Registration, Teams } from './pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';
import { Team } from './pages/teams/components';

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
	const dispatch = useDispatch();

	useEffect(() => {
		const storedUserData = sessionStorage.getItem('userData');
		if (storedUserData) {
			const user = JSON.parse(storedUserData);
			dispatch(setUser(user));
		}
	}, [dispatch]);

	return (
		<>
			{!isAuthPage && (
				<AppColumn>
					<Header />
					<Page>
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="/projects" element={<Projects />} />
							<Route path="/teams" element={<Teams />} />
							<Route path="/teams/:teamId" element={<Team />} />
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
