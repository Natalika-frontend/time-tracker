import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { AuthFormError, Button, Input } from '../../components';
import { request } from '../../utils';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions';
import { useResetForm } from '../../hooks/use-reset-form';
import { Navigate } from 'react-router-dom';
import { ROLE } from '../../constants/role';
import { selectUserRole } from '../../selectors';

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполните логин')
		.email('Неверно заполнен логин. Укажите правильный email-адрес')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'неверно заполнен пароль. Допускаются только буквы, цифры и знаки # и %'
		)
		.min(5, 'Неверно заполнен пароль. Минимум 5 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

const LoginContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ email, password }) => {
		request('/login', 'POST', { email, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			}
		);
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;
	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Вход</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Email..."
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" width="120px" disabled={!!formError}>
					Войти
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
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
