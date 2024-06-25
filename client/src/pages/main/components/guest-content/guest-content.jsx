import styled from 'styled-components';

const GuestContentContainer = ({ className }) => {
	return (
		<div className={className}>
			<h1>Тайм-трекер для ваших проектов</h1>
			<p>
				Тайм-трекер — программа, которая показывает, сколько времени
				занимает выполнение задачи у отдельно взятого человека или
				команды исполнителей.
				<br />
				<br /> Тайм-трекер решает такие задачи:
				<br />- Мониторит время по задачам, проектам, исполнителям.
				<br />- Выявляет «слабые» места команды, указывая, на решение
				каких вопросов тратится больше всего времени.
				<br />- Оценивает продуктивность участников проекта.
			</p>
		</div>
	);
};

export const GuestContent = styled(GuestContentContainer)`
	display: flex;
	flex-direction: column;
	text-align: center;
`;
