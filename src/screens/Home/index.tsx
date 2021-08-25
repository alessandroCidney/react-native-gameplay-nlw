import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { styles } from './styles';

import { Profile } from '../../components/Profile';

import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentsItemType } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Load } from '../../components/Load';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

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
	const [loading, setLoading] = useState(true);
	const [appointments, setAppointments] = useState<AppointmentsItemType[]>([]);

	function handleAppointmentDetails(guildSelected: AppointmentsItemType) {
		navigation.navigate("AppointmentDetails", { guildSelected: guildSelected });
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

	async function loadAppointments() {
		const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

		const storage: AppointmentsItemType[] = response ? JSON.parse(response) : [];

		if(category) {
			setAppointments(storage.filter(item => item.category === category));
		} else {
			setAppointments(storage);
		}

		setLoading(false);
	}

	// useFocusEffect chama a função toda vez que a página é exibida

	// useCallback tem como dependência o estado category, ou seja, toda vez que selecionarmos
	// uma categoria, a função loadAppointments será recarregada

	useFocusEffect(useCallback(() => {
		loadAppointments();
	}, [category]));

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
			
			{
				loading
				? <Load />
				:
				<>
					<ListHeader 
						title="Partidas agendadas"
						subtitle={`Total ${appointments.length}`}
					/>

					<FlatList 
							data={appointments}
							keyExtractor={item => item.id}
							renderItem={({item}) => (
								<Appointment 
									data={item} 
									onPress={() => handleAppointmentDetails(item)}
								/>
							)}
							ItemSeparatorComponent={() => <ListDivider />}
							
							// Para adicionar espaçamento ao fim da lista
							contentContainerStyle={{ paddingBottom: 69 }}
							
							style={styles.matches}
							showsVerticalScrollIndicator={false}
							scrollEnabled
						/>
				</>
			}
			
		</Background>
	);
}