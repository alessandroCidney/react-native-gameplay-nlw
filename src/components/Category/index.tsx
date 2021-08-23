import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type CategoryProps = RectButtonProps & {
	title: string;
	icon: React.FC<SvgProps>;
	checked?: boolean;
	hasCheckBox?: boolean;
}

// Para converter o icon para componente, é necessário declará-lo com letra maiúscula
// na hora de passar as propriedade

// props.icon -> Icon

export function Category({
	title,
	icon: Icon,
	checked=false,
	hasCheckBox=false,
	...rest
}: CategoryProps) {

	const { secondary40, secondary50, secondary70, secondary85 } = theme.colors;

	return (
		<RectButton {...rest}>
			<LinearGradient
				style={styles.container}
				colors={[secondary50, secondary70]}
			>	
				{/*A opacidade do botão depende se ele está "checked" ou não*/}
				<LinearGradient 
					style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
					colors={[checked ? secondary85 : secondary50, secondary40]}
				>

					{
						hasCheckBox &&
						<View style={checked ? styles.checked : styles.check} />
					}	

					<Icon width={48} height={48} />

					<Text style={styles.title}>
						{ title }
					</Text>
				</LinearGradient>
			</LinearGradient>
		</RectButton>
	);
}