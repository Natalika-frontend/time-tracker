import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Button, Input } from '../../components';
import { Link } from 'react-router-dom';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(
			/^\w+$/,
			'Неверно заполнен логин. Допускаются только буквы и цифры'
		)
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'неверно заполнен пароль. Допускаются только буквы, цифры и знаки # и %'
		)
		.min(8, 'Неверно заполнен пароль. Минимум 8 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const LoginContainer = ({ className }) => {
	const {
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const onSubmit = () => {
		console.log('dsd');
	};

	return (
		<div className={className}>
			<h2>Войти</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Email..."
					onChange={() => {
						console.log('sad');
					}}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					onChange={() => {
						console.log('gfgf');
					}}
				/>
				<Button type="submit" width="120px">
					Отправить
				</Button>
			</form>
		</div>
	);
};

export const Login = styled(LoginContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 15%;

	& > form {
		display: flex;
		align-items: center;
		padding: 30px;
		flex-direction: column;
		width: 500px;
		border: 3px solid #4a148c;
	}
`;
