import React, { useState } from 'react';
import { View, FlatList } from 'react-native';

import { styles } from './styles';

import { Profile } from '../../components/Profile';

import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';

import { useNavigation } from '@react-navigation/native';

/**
 * FlatLists são componentes indicados quando é necessário renderizar muitos elementos de uma vez
 * Elas renderizam aos poucos e dão prioridade aos elementos visíveis
 * 
 * Para poucos elementos, use ScrollViews
 * 
 * As FlatLists permitem que você lide com as keys utilizando a propriedade
 * KeyExtractor
 * 
 * As FlatLists permitem que você utilize um componente como separador, indicado em
 * ItemSeparatorComponent
 * */

export function Home() {

	const navigation = useNavigation();

	const [category, setCategory] = useState('');

	const appointments = [
		{
			id: '1',
			guild: {
				id: '1',
				name: 'Lendários',
				icon: null,
				owner: true
			},
			category: '1',
			date: '22/06 às 20:40h',
			description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
		},
		{
			id: '2',
			guild: {
				id: '1',
				name: 'Seniors',
				icon: null,
				owner: false
			},
			category: '1',
			date: '22/06 às 20:40h',
			description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
		},
		{
			id: '3',
			guild: {
				id: '1',
				name: 'Incríveis',
				icon: null,
				owner: true
			},
			category: '1',
			date: '22/06 às 20:40h',
			description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
		},
		{
			id: '4',
			guild: {
				id: '1',
				name: 'Super Potatos',
				icon: null,
				owner: false
			},
			category: '1',
			date: '22/06 às 20:40h',
			description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
		}
	];

	function handleAppointmentDetails() {
		navigation.navigate("AppointmentDetails");
	}

	function handleAppointmentCreate() {
		navigation.navigate("AppointmentCreate");
	}

	function handleCategorySelect(categoryId: string) {
		/*
			Função para marcar e desmarcar uma cetgoria
			Baseia-se na troca do ID da categoria contido em category através de setCategory
		*/

		categoryId === category ? setCategory('') /*Desmarca*/ : setCategory(categoryId) /*Marca*/; 
	}

	return (
		<Background>
			<View style={styles.header}>
				<Profile />
				<ButtonAdd 
					onPress={handleAppointmentCreate}
				/>
			</View>

			<CategorySelect
				categorySelected={category}
				setCategory={handleCategorySelect}
			/>
			
			<ListHeader 
				title="Partidas agendadas"
				subtitle="Total 6"
			/>

			<FlatList 
					data={appointments}
					keyExtractor={item => item.id}
					renderItem={({item}) => (
						<Appointment 
							data={item} 
							onPress={handleAppointmentDetails}
						/>
					)}
					ItemSeparatorComponent={() => <ListDivider />}
					
					// Para adicionar espaçamento ao fim da lista
					contentContainerStyle={{ paddingBottom: 69 }}
					
					style={styles.matches}
					showsVerticalScrollIndicator={false}
					scrollEnabled
				/>
		</Background>
	);
}