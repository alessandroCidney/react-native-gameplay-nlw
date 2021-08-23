/**
 * Arquivo destinado a tratar das rotas que o usuário tem acesso quando está autenticado*/

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../global/styles/theme';

import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';

const { Navigator, Screen } = createStackNavigator();

/*
	A primeira Screen definida será aberta primeiro
*/

/*
	navigatorOptions foi sugerido em:
	https://stackoverflow.com/questions/59900898/white-background-flashing-when-switching-screens-react-navigation-v5
*/

// const navigatorOptions = {
//   headerShown: false,
//   cardStyle: { backgroundColor: theme.colors.secondary100 },
//   cardStyleInterpolator: ({ current: { progress } }) => ({
//     cardStyle: {
//       opacity: progress.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, 1],
//       }),
//     },
//     overlayStyle: {
//       opacity: progress.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, 0.5],
//         extrapolate: 'clamp',
//       }),
//     },
//   }),
// }

export function AppRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: theme.colors.secondary100
				}
			}}
		>
			<Screen 
				name="Home"
				component={Home}
			/>
			<Screen 
				name="AppointmentDetails"
				component={AppointmentDetails}
			/>
			<Screen
				name="AppointmentCreate"
				component={AppointmentCreate}
			/>
		</Navigator>
	);
} 