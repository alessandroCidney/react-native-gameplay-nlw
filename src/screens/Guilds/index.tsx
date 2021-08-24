import React from 'react';
import { View, FlatList } from 'react-native';

import { styles } from './styles';

import { Guild } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { GuildDataType } from '../../components/Guild';

type Props = {
	handleGuildSelect: (guild: GuildDataType) => void;
}

export function Guilds({ handleGuildSelect }: Props) {

	const [guilds, setGuilds] = useState<GuildDataType[]>([]);

	return (
		<View style={styles.container}>
			<FlatList 
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
		</View>
	);
}