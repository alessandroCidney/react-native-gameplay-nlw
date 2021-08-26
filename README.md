# Aula 1

## Iniciando o projeto com expo

### Instalando e criando
- `npm install -g expo-cli`
- `expo init <nome do projeto>`

### Rodando o projeto
- `expo start`

### Arquivos
- https://www.notion.so/Material-para-as-aulas-a3f0ede387c0442b845b29d50a89686b

## Desenvolvimento

### Cor de fundo do Splash
- Pode ser alterada no app.json

### Arquivos .d.ts
- Servem para definir a tipagem
- Utilizamos um para definir o tipo das imagens PNG 

### Barra de status

#### barStyle
- Define a cor dos elementos da barra de status

#### backgroundColor
- Define a cor de fundo

#### Translucent
- Booleano que, se verdadeiro faz com que o conteúdo inicie a partir do início da tela e não depois da barra de status

### Components

#### TouchableOpacity
- Componente clicável

##### activeOpacity
É uma propriedade da TouchableOpacity que define a opacidade do botão ao ser clicado (vai de 0 a 1)

# Aula 2

## Instalando novas dependências

### Expo-font e @expo-google-fonts

- `expo install expo-font @expo-google-fonts/inter @expo-google-fonts/rajdhani`

Como usar (Exemplo):

```javascript
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';

export function App() {

	const [fontsLoaded] = useFonts({
	    Inter_400Regular,
	    Inter_500Medium,
	    Rajdhani_500Medium,
	    Rajdhani_700Bold
	  });

	/*
	  Ativa o Splash enquanto as fontes não forem carregadas
	*/

	if(!fontsLoaded) {
	    return <AppLoading />
	  }

	return (
		/*Demais itens*/
	)
}
```

### Expo-app-loading

- `expo install expo-app-loading`

### Expo-linear-gradient

- `expo install expo-linear-gradient`

### React Native Iphone X Helper
- Adapta a interface a modelos de Iphone que possuem detalhe na frente do espaço considerado como tela.
- `yarn add react-native-iphone-x-helper`

### React Natigation
- Para a navegação entre páginas
- `yarn add @react-natigation/native`

#### Outras dependências
- `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`

#### Estilos de navegação
Existem diferentes tipos de navegação (tab, stack, etc.). Usaremos stack.
- `yarn add @react-navigation/stack`

### Expo vector icons
- Basta importar os ícones que desejar de @expo/vector-icons

### React Native SVG
- Biblioteca que ajuda o react native a lidar com svg
- `expo install react-native-svg`
- Para usar SVGs como componentes, utilize também o React Native SVG Transformer
- `yarn add --dev react-native-svg-transformer`
- Necessário criar o arquivo metro.config.js descrito na documentação

## Novos componentes

### FlatLists
- FlatLists são componentes indicados quando é necessário renderizar muitos elementos de uma vez

- Elas renderizam aos poucos e dão prioridade aos elementos visíveis

- Para poucos elementos, use ScrollViews

- As FlatLists permitem que você lide com as keys utilizando a propriedade KeyExtractor

- As FlatLists permitem que você utilize um componente como separador, indicado em ItemSeparatorComponent

### ScrollViews
- São como as FlatLists, mas devem ser usadas para poucos elementos

# Aula 3

## Funções do hook useNavigation

### Navegar para Screen específica

```javascript
	
const navigation = useNavigation();

navigation.navigate("Nome da Screen");

```


#### Navegar para Screen anterior

```javascript

const navigation = useNavigation();

navigation.goBack();

```

## Novos componentes

### TextInput

- Permite a adição de um input de forma simples

#### Propriedade keyboardType
- Essa propriedade do TextInput nos permite controlar os tipos de valores que serão aceitos
- Ver documentação do React Native para mais detalhes

#### Outras propriedades
- maxLength (number)
- multiline (boolean)
- numberOfLines (number)
- autoCorrect (boolean)

## KeyboardAvoidingView
- Melhora a experiência do usuário impedindo o "escondimento" de elementos ao acionar o teclado
- Use uma ScrollView dentro para movimentar um pouco a tela ao acionar o teclado

### Propriedades importantes
- Aceita style

#### Behavior
- Define o comportamento da KeyboardAvoidingView
- Você pode definir o comportamento como 'padding', 'height', etc.
- É possível definir um comportamento diferente para cada plataforma

Exemplo:

```javascript
<KeyboardAvoidingView 
	style={styles.container}
	behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
></KeyboardAvoidingView>
```
## Platform
- Permite a detecção da plataforma utilizada pelo usuário através de OS

Exemplo:

```javascript
console.log(Platform.OS === 'ios' ? 'Usa iOS' : 'Usa Android');
```

## Modal
- É um componente que permite que um componente seja aberto/mostrado sobre outro

### Principais propriedades
- transparent (boolean)
- animationType ("slide", etc)
- visible (boolean) - Controla se o modal estará visível ou não
- statusBarTranslucent - Controle se a barra de status será afetada pelos itens do modal

# Aula 4

## TouchableWithoutFeedback
- É um componente utilizado para executar algo quando há cliques, e não especificamente para apresentar uma resposta visual

## AuthSession
- O Expo já suporta várias estratégias de autenticação, mas, para lidar com redirecionamentos do navegador, obtenção de tokens, autenticação OAuth2 (etc.), use o AuthSession
- Basicamente, fazemos uma solicitação de autenticação para o servidor (através do navegador) e somos redirecionados de volta, sendo que o servidor envia o token de autenticação, que será extraído com Deep Link
- OAuth2 é um dos padrões de autenticação mais seguros

#### Instalação
- `expo install expo-auth-session expo-random`

#### Tipagem
- Dentro do próprio AuthSession existe uma tipagem para o resultado da autenticação, que é `AuthSessionResult`

Exemplo:
```typescript
type AuthResult = AuthSession.AuthSessionResult & {
	...
}
```

## Axios
- Uma biblioteca muito útil para fazer requisições
- `yarn add axios`

## Alert
- É um componente do React Native para exibir mensagens

```javascript
import { Alert } from 'react-native';

Alert.alert("Mensagem")
```

## Observação - App.json
- Acrescentar `"scheme": "nome-do-app"`, que informa o nome do app

## Observação - LAN e Tunnel
- É importante, ao utilizar os redirecionamentos, alterar o modo de conexão (em CONNECTION, no Expo Dev Tools - http://localhost:19002/) de LAN para Tunnel, pois não estamos mais trabalhando apenas no ambiente local

## LogBox
- Componente do React Native responsável pelos logs e avisos
- Você pode desabilitar avisos e logs específicos (ou desabilitar todos os logs) com ele

Exemplo:
```javascript
import { LogBox } from 'react-native';

LogBox.ignoreLogs(["You are not currently signed in to Expo on your development machine."]);
```

## Sobre a autenticação com o Discord
- Ao conseguir o token após se autenticar com o auxílio do AuthSession, é necessário consumir uma das rotas da API do discord (consulte os tópicos sobre OAuth2 na documentação do Discord)
- No caso, a rota para obter informações do usuário é `/users/@me`, com `https://discord.com/api` antes (provavelmente a autenticação é necessária para obter as informações, por isso deve-se inserir no header das requisições o access_token como autorização)
- A rota para pegar as imagens de avatares é `/avatars/:user_id/:hash_do_avatar` (com o endereço da CDN antes, ou seja, `https://cdn.discordapp.com`)

# Aula 5

## Variáveis de ambiente
- Você pode utilizar variáveis de ambiente após instalar as bibliotecas necessárias com `yarn add dotenv babel-plugin-inline-dotenv`
- Além disso, para utilizá-las, é necessário adicionar as seguintes linhas ao return do arquivo `babel.config.js`:

```javascript
{
	plugins: ["inline-dotenv"]
}
```

## ActivityIndicator
- Componente que insere o clássico símbolo de carregamento de círculo
- É possível definir a cor dele através da propriedade `color`

## Async Storage
- API para armazenamento local no dispositivo do usuário
- Para instalar utilizando o Expo, use `expo install @react-native-async-storage/async-storage`
- Baseado em chave-valor, semelhante ao JSON


### Salvando valores

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

async function something() {
	AsyncStorage.setItem('nome-da-colecao', 'string')
}
```

- Você também pode salvar objetos através de JSON.stringify()

```javascript
async function something() {
	AsyncStorage.setItem('nome-da-colecao', JSON.stringify({
		message: 'Eu sou um objeto!'
	}));
}
```

### Recuperando valores

```javascript
async function something() {
	const results = await AsyncStorage.getItem('nome-da-colecao');
}

```

- Use `JSON.parse` para converter objetos armazenados

```javascript
async function something() {
	const results = await AsyncStorage.getItem('nome-da-colecao');

	const parsed = JSON.parse(results);
}
```

## UUID
- Para usar uuids no React Native, instale a biblioteca com `yarn add react-native-uuid`

```javascript
import uuid from 'react-native-uuid';

const id = uuid.v4();
```

## Hook useCallback
- Evita que uma função seja renderizada desnecessariamente

## Share
- Componente do React Native (API) para que possamos lidar com compartilhamento

Exemplo de função do projeto que utiliza o Share:

```javascript
function handleShareInvitation() {
	/**
	 * Se o sistema operacional for iOS, a string será a mensagem compartilhada
	 * Se o sistema operacional for outro, o instant_invite será a mensagem compartilhada*/
	const message = Platform.OS === 'ios' 
	? `Junte-se a ${guildSelected.guild.name}`
	: widget.instant_invite;

	Share.share({
		message,
		url: widget.instant_invite
	})
}
```

## Linking
- Componente do Expo para lidar com redirecionamento

Exemplo de função com Linking utilizada no projeto:

```javascript
import * as Linking from 'expo-linking';

function handleOpenGuild() {
	Linking.openURL(widget.instant_invite);
}

```