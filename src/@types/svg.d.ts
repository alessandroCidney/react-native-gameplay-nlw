declare module "*.svg" {
	import React from 'react';
	import { SvgProps } from 'react-native-svg';
	
	const content: React.FC<SvgProps>
	// Afirma que o conteúdo é um componente 
	// funcional

	export default content;
}

// Resolve o problema de o TypeScript não reconhecer imagens SVGs como módulos.