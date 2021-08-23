import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';

import { useAuth } from '../hooks/auth';

import { Background } from '../components/Background';

import { SignIn } from '../screens/SignIn';

export function Routes() {
	const { user } = useAuth();

	return (
		<NavigationContainer>
			{
				// Se o usuário estiver autenticado, ele vai para AuthRoutes.
				// Se não, ele vai para a tela de login
				user.id ? <AppRoutes/> : <SignIn />
			}
		</NavigationContainer>
	);
}