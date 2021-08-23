import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { LinearGradient } from 'expo-linear-gradient';

import { GuildIcon } from '../GuildIcon';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { categories } from '../../utils/categories';

import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import { GuildDataType } from '../Guild';

export type AppointmentsItemType = {
	id: string;
	guild: GuildDataType;
	category: string;
	date: string;
	description: string;
}

type AppointmentPropsType = ReactButtonProps & {
	data: AppointmentsItemType;
}

export function Appointment({ data, ...rest }: AppointmentPropsType) {

	const [category] = categories.filter(item => item.id === data.category)
	const { owner } = data.guild;
	const { primary, on, secondary50, secondary70 } = theme.colors;

	return (
		<RectButton 
			{...rest}
		>
			<View style={styles.container}>
				<LinearGradient
					style={styles.guildIconContainer}
					colors={[secondary50, secondary70]}
				>
					<GuildIcon />
				</LinearGradient>

				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.title}>
							{data.guild.name}
						</Text>

						<Text style={styles.category}>
							{category.title}
						</Text>
					</View>

					<View style={styles.footer}>
						<View style={styles.dateInfo}>
							<CalendarSvg />

							<Text style={styles.date}>
								{data.date}
							</Text>
						</View>

						{/*
							Fill refere-se à cor do preenchimento do svg
						*/}

						<View style={styles.playersInfo}>
							<PlayerSvg fill={owner ? primary : on} />
						
							<Text style={[
								styles.player, {color: owner ? primary : on}
							]}>
								{owner ? 'Anfitrião' : 'Visitante'}
							</Text>
						</View>
					</View>

				</View>
			</View>
		</RectButton>
	);
}