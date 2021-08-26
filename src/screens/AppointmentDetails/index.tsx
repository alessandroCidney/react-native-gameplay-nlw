import React, { useState, useEffect } from 'react';
import { 
	ImageBackground, 
	Text, 
	View, 
	FlatList, 
	Alert, 
	Share,
	Platform
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import * as Linking from 'expo-linking';

import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { MemberDataType } from '../../components/Member';
import { Load } from '../../components/Load';

import { AppointmentsItemType } from '../../components/Appointment';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import BannerImg from '../../assets/banner.png';

import { api } from '../../services/api';

type Params = {
	guildSelected: AppointmentsItemType;
}

type GuildWidget = {
	id: string;
	name: string;
	instant_invite: string;
	members: MemberDataType[];
}

export function AppointmentDetails() {

	const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
	const [loading, setLoading] = useState(true);

	const route = useRoute();

	const { guildSelected } = route.params as Params;

	const { primary } = theme.colors;

	async function fetchGuildWidget() {
		try {
			const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
			
			setWidget(response.data);
		} catch (error) {
			Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchGuildWidget();
	}, []);

	function handleShareInvitation() {
		/**
		 * Se o sistema operacional for iOS, a string será a mensagem compartilhada
		 * Se o sistema operacional for outro, o instant_invite será a mensagem compartilhada
		 * */
		
		 /**
		  * OBSERVAÇÃO
		  * Só é possível compartilhar o convite se você for o dono do servidor do Discord,
		  * pois só quem criou tem acesso ao instant_invite
		  * */

		const message = Platform.OS === 'ios' 
		? `Junte-se a ${guildSelected.guild.name}`
		: widget.instant_invite;

		Share.share({
			message,
			url: widget.instant_invite
		})

		// O botão de compartilhar só aparecerá se o usuário for o dono do servidor
	}

	function handleOpenGuild() {
		Linking.openURL(widget.instant_invite);
	}

	return (
		<Background>
			<Header 
				title="Detalhes"
				action={
					guildSelected.guild.owner && 
					<BorderlessButton onPress={handleShareInvitation}>
						<Fontisto 
							name="share"
							size={24}
							color={theme.colors.primary}
						/>
					</BorderlessButton>
				}
			/>	

			<ImageBackground
				source={BannerImg}
				style={styles.banner}
			>
				<View style={styles.bannerContent}>
					<Text style={styles.title}>
						{ guildSelected.guild.name }
					</Text>

					<Text style={styles.subtitle}>
						{ guildSelected.guild.description }
					</Text>
				</View>	
			</ImageBackground>

			{
				loading 
				?	<Load />
				:	<>
						<ListHeader 
							title="Jogadores"
							subtitle={`Total ${widget.members.length}`}
						/>

						<FlatList 
							data={widget.members}
							keyExtractor={item => item.id}
							renderItem={({item}) => (
								<Member data={item} />
							)}
							ItemSeparatorComponent={() => <ListDivider isCentered />}
							style={styles.members}
						/>
					</>
			}

			{
				guildSelected.guild.owner &&
				<View style={styles.footer}>
					<ButtonIcon 
						title="Entrar na partida"
						onPress={handleOpenGuild} 
					/>
				</View>
			}
			
		</Background>
	);
}