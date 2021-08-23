import React from 'react';
import { Text, Image, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

import discordImg from '../../assets/discord.png';

type ButtonProps = ReactButtonProps & {
	title: string;
}

// Você também pode utilizar interfaces ao invés de types

/*

interface ButtonProps {
	...
}

*/

export function ButtonIcon({ title, ...rest }: ButtonProps) {

	return (
		<RectButton style={styles.container} {...rest}>
			<View style={styles.iconWrapper}>
				<Image source={discordImg} style={styles.icon} />
			</View>

			<Text style={styles.title}>
				{title}
			</Text>
		</RectButton>
	);
}