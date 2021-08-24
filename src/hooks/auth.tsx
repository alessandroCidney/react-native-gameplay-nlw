import React, { 
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect
} from 'react';

import * as AuthSession from 'expo-auth-session';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';

import { COLLECTION_USERS } from '../configs/database';

const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

type User = {
	id: string;
	username: string;
	firstName: string;
	avatar: string;
	email: string;
	token: string;
}

type AuthContextData = {
	user: User;
	loading: boolean;
	signIn: () => Promise<void>;
}

type AuthProviderProps = {
	children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
	params: {
		access_token?: string;
		error?: string;
	}
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

	const [user, setUser] = useState<User>({} as User);
	
	// Para saber se a autenticação já foi concluída
	const [loading, setLoading] = useState(false);

	async function signIn() {
		const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

		try {

			setLoading(true);

			// Após a autenticação, o token é disponibilizado

			// type contém a informação sobre o resultado (se foi bem sucedido ou não)

			const { type, params } = await AuthSession.startAsync({ 
				authUrl /*A URL para a qual o usuário será redirecionado*/ 
			}) as AuthorizationResponse;

			if(type === "success" && !params.error) {
				// Como já obtemos o token neste ponto (que está contido em params),
				// podemos inseri-lo no cabeçalho (header) de todas as requisições de uma vez só,
				// o que faremos logo a seguir

				api.defaults.headers.authorization = `Bearer ${params.access_token}`;

				const userInfo = await api.get('/users/@me');

				const firstName = userInfo.data.username.split(' ')[0];

				// Atualizando o avatar contido no objeto (antes o "avatar" só era um hash)
				userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

				const userData = {
					...userInfo.data,
					firstName,
					token: params.access_token
				};

				await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));

				setUser(userData);
			}
		} catch {
			throw new Error("Não foi possível autenticar");
		} finally {
			setLoading(false);
		}
	}

	async function loadUserStorageData() {
		const storage = await AsyncStorage.getItem(COLLECTION_USERS);

		if(storage) {
			const userLogged = JSON.parse(storage) as User;

			api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

			setUser(userLogged);
		}
	}

	useEffect(() => {
		loadUserStorageData();
	}, []);

	return (
		<AuthContext.Provider value={{
			user,
			loading,
			signIn
		}}>
			{ children }
		</AuthContext.Provider>
	);
}

function useAuth() {

	const context = useContext(AuthContext);

	return context;
}

export {
	AuthProvider,
	useAuth
}