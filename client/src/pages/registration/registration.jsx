import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AuthFormError, Button, Input, Loader } from '../../components';
import { Navigate } from 'react-router-dom';
import { selectUserRole } from '../../selectors';
import { useResetForm } from '../../hooks/use-reset-form';
import { request } from '../../utils';
import { setUser } from '../../actions';
import { ROLE } from '../../constants/role';

const registerFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполните логин')
		.email('Неверно заполнен логин. Укажите правильный email-адрес')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(50, 'Неверно заполнен логин. Максимум 50 символов'),
	login: yup.string().required('Заполните логин'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'неверно заполнен пароль. Допускаются только буквы, цифры и знаки # и %'
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(registerFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ email, login, password }) => {
		setIsLoading(true);
		request('/register', 'POST', { email, userName: login, password }).then(
			({ error, user }) => {
				setIsLoading(false);
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			}
		);
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<h2>Регистрация</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							type="text"
							placeholder="email..."
							{...register('email', {
								onChange: () => setServerError(null),
							})}
						/>
						<Input
							type="text"
							placeholder="Логин..."
							{...register('login', {
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
						<Input
							type="password"
							placeholder="Повтор пароля..."
							{...register('passcheck', {
								onChange: () => setServerError(null),
							})}
						/>
						<Button type="submit" disabled={!!formError}>
							Зарегистрироваться
						</Button>
						{errorMessage && (
							<AuthFormError>{errorMessage}</AuthFormError>
						)}
					</form>
				</>
			)}
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 15%;

	& > form {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30px;
		width: 500px;
		border: 3px solid #4a148c;
	}
`;
