import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

type ButtonProps = ReactButtonProps & {
	title: string;
}

// Você também pode utilizar interfaces ao invés de types

/*

interface ButtonProps {
	...
}

*/

export function Button({ title, ...rest }: ButtonProps) {

	return (
		<RectButton style={styles.container} {...rest}>
			<Text style={styles.title}>
				{title}
			</Text>
		</RectButton>
	);
}