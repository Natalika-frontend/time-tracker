import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Input } from '../../components';
import { Navigate } from 'react-router-dom';

const registerFormSchema = yup.object().shape({
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

	const onSubmit = () => {
		console.log('dfgd');
	};

	return (
		<div className={className}>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					onChange={() => {
						console.log('dfgdf');
					}}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					onChange={() => {
						console.log('dsfd');
					}}
				/>
				<Input
					type="password"
					placeholder="Проверка пароля..."
					onChange={() => {
						console.log('fdgdf');
					}}
				/>
				<Button type="submit">Зарегистрироваться</Button>
			</form>
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
