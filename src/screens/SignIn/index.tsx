import React from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';

import { styles } from './styles';

import { ButtonIcon } from '../../components/ButtonIcon';

import illustrationImg from '../../assets/illustration.png';

import { Background } from '../../components/Background';

import { useAuth } from '../../hooks/auth';

import { theme } from '../../global/styles/theme';

export function SignIn() {

  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {

      await signIn();

    } catch (error) {
      Alert.alert(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
      	<Image 
        		style={styles.image} 
        		source={illustrationImg} 
        		resizeMode="stretch"
        	/>

        	<View style={styles.content}>
        		<Text style={styles.title}>
        			Conecte-se {`\n`}
        			e organize suas {`\n`} 
        			jogatinas
        		</Text>

        		<Text style={styles.subtitle}>
        			Crie grupos para jogar seus games {`\n`}
        			favoritos com seus amigos
        		</Text>

        		{
              loading 
              ? <ActivityIndicator color={theme.colors.primary} />
              : <ButtonIcon 
                  title="Entrar com o Discord"
                  onPress={handleSignIn}
                />
            }
        	</View>
      </View>  
    </Background>
  );
}

// export function SignIn() {
// 	const [text, setText] = useState('');

//   return (
//     <View style={styles.container}>
//       <Text>Hello World!</Text>

//       <TextInput 
//       	style={styles.input}
//       	onChangeText={setText} // OnChangeText retorna o valor do texto digitado
//       />

//       <Text>
//       	Você digitou: {text}
//       </Text>
//     </View>  
//   );
// }