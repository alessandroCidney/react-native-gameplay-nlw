import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';

import { styles } from './styles';

import { Guild, GuildDataType } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';

import { api } from '../../services/api';

type Props = {
	handleGuildSelect: (guild: GuildDataType) => void;
}

export function Guilds({ handleGuildSelect }: Props) {

	const [guilds, setGuilds] = useState<GuildDataType[]>([]);
	const [loading, setLoading] = useState(true);

	async function fetchGuilds() {
		const response = await api.get('/users/@me/guilds');

		setGuilds(response.data);
		setLoading(false);
	}

	useEffect(() => {
		fetchGuilds();
	}, [])

	return (
		<View style={styles.container}>
			{
				loading 
				? 	<Load />
				: 	<FlatList 
						data={guilds}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<Guild 
								data={item}
								onPress={() => handleGuildSelect(item)}
							/>
						)}
						showsVerticalScrollIndicator={false}

						ItemSeparatorComponent={() => <ListDivider isCentered />}

						// Para adicionar algo ANTES do conteúdo da lista
						ListHeaderComponent={() => <ListDivider isCentered />}

						style={styles.guilds}

						// Para adicionar espaçamento ao fim da lista
						contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
					/>
			}
		</View>
	);
}