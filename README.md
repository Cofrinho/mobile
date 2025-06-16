# 🐷 Cofrinho APP / FRONTEND

APP do **Cofrinho**, plataforma para organização e controle de despesas compartilhadas entre grupos, com integração ao ecossistema **Open Finance** (Simulado).

> 🔗 O backend do APP está disponível em: [github.com/Cofrinho/backend](https://github.com/Cofrinho/backend)

---

## 🚀 Funcionalidades

- 👤 Cadastro, login e edição de perfil de usuários
- 🔐 Autenticação segura integrada com JWT do backend
- 💳 Visualização e gerenciamento de contas vinculadas via Open Finance
- 👥 Criação e gerenciamento de grupos e membros
- 💰 Controle e divisão de despesas compartilhadas
- 📲 Notificações internas e status das transações
- 📱 Interface responsiva com navegação intuitiva via Expo Router

---

## 🔧 Requisitos

- **Node.js** – versão recomendada LTS
- **Git** – para clonar o repositório  

---

## 🛠️ Tecnologias

### **Mobile / Front-end**
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.github.io/router/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) e [SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Lucide React Native](https://www.npmjs.com/package/lucide-react-native)

### **Dev Tools**
- ESLint e Prettier para padronização de código
- TypeScript para tipagem estática
- Expo CLI para desenvolvimento e build

---

## 📁 Estrutura de Pastas (principal)

```
.
├── app/             
│   ├── auth/             
│   │   └── forgot-password/
│   │   └── register/
│   ├── bank-app/        
│   │   └── open-finance/
│   │   └── payment/
│   ├── expense/
│   ├── open-finance/     
│   │   └── link-expiration/
│   │   └── link-successfull/
│   │   └── select-payment-account/
│   ├── tabs/             
│   │   └── account/
│   │   └── add-funds/
│   │   └── groups/
│   └── user/
├── assets/               
│   └── animations/
│   └── fonts/
│   └── images/
├── components/           
├── constants/            
├── contexts/              
├── services/             
├── utils/
```

---

## ⚙️ Como Executar o Projeto

1. **Clonar o repositório e acessar a pasta:**

```bash
git clone https://github.com/Cofrinho/mobile.git
cd mobile
```

2. **Instalar dependências:**

```bash
npm install
```

3. **Iniciar o servidor Expo:**

```bash
npx expo start
```

4. **Abrir o app:**

- No emulador Android ou iOS (via comandos `npm run android` ou `npm run ios`)
- No dispositivo físico, escaneando o QR code exibido no terminal ou navegador, usando o app Expo Go

---

## 📌 Sobre o Projeto

O Cofrinho foi desenvolvido como projeto final do estágio na Compass UOL, com o objetivo de aplicar conceitos de clean architecture, segurança e integração via Open Finance. O Cofrinho é uma plataforma pensada para facilitar o controle de despesas compartilhadas entre grupos, permitindo a conexão com múltiplas instituições financeiras por meio do ecossistema aberto do Open Finance.

O projeto demonstra na prática como é possível unir organização financeira colaborativa com tecnologias modernas de integração bancária, oferecendo uma base sólida para soluções financeiras inovadoras.
