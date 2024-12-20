# AppMinhasAnotacoes

Este é o aplicativo **Minhas Anotações** para gerenciamento de notas. Ele permite criar, obter, atualizar e deletar notas, além de oferecer funcionalidades de busca e favoritar notas.

## Requisitos

- Node.js (versão LTS recomendada)
- Expo CLI

## Instalação

1. Instale as dependências:

    ```bash
    npm install
    ```

2. Inicie o projeto:

    ```bash
    npx expo start
    ```

## Scripts

- `npm start`: Inicia o aplicativo usando o Expo.
- `npm run android`: Inicia o aplicativo no emulador Android.
- `npm run ios`: Inicia o aplicativo no emulador iOS.
- `npm run web`: Inicia o aplicativo na web.
- `npm test`: Executa os testes.
- `npm run lint`: Executa o linting no código.

## Dependências

```json
  "dependencies": {
    "@expo/vector-icons": "^14.0.2",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@react-navigation/native": "^7.0.12",
    "axios": "^1.7.8",
    "expo": "~52.0.11",
    "expo-blur": "~14.0.1",
    "expo-constants": "~17.0.3",
    "expo-font": "~13.0.1",
    "expo-haptics": "~14.0.0",
    "expo-linking": "~7.0.3",
    "expo-router": "~4.0.9",
    "expo-splash-screen": "~0.29.13",
    "expo-status-bar": "~2.0.0",
    "expo-symbols": "~0.2.0",
    "expo-system-ui": "~4.0.4",
    "expo-web-browser": "~14.0.1",
    "nativewind": "^4.1.23",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-native": "0.76.3",
    "react-native-color-picker": "^0.6.0",
    "react-native-gesture-handler": "~2.20.2",
    "react-native-reanimated": "~3.16.1",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.1.0",
    "react-native-web": "~0.19.13",
    "react-native-webview": "13.12.2",
    "tailwindcss": "^3.4.15"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/jest": "^29.5.12",
    "@types/react": "~18.3.12",
    "@types/react-test-renderer": "^18.3.0",
    "babel-plugin-dotenv-import": "^3.0.1",
    "jest": "^29.2.1",
    "jest-expo": "~52.0.2",
    "react-test-renderer": "18.3.1",
    "typescript": "^5.3.3"
  },

