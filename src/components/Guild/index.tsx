import React from 'react';
import { 
	View, 
	Text, 
	TouchableOpacity, 
	TouchableOpacityProps 
} from 'react-native'

import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { GuildIcon } from '../GuildIcon';

export type GuildDataType = {
	id: string;
	name: string;
	icon: string | null;
	owner: boolean;
}

type GuildType = TouchableOpacityProps & {
	data: GuildDataType;
}

export function Guild({data, ...rest}: GuildType) {

	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.7}
			{...rest}
		>
			<GuildIcon 
				guildID={data.id}
				iconID={data.icon}
			/>

			<View style={styles.content}>
				<View>
					<Text style={styles.title}>
						{data.name}
					</Text>

					<Text style={styles.type}>
						{data.owner ? 'Administrador' : 'Convidado'}
					</Text>
				</View>
			</View>

			<Feather 
				name="chevron-right"
				color={theme.colors.heading}
				size={24}
			/>
		</TouchableOpacity>
	);
}