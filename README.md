# 🐷 Cofrinho APP / FRONTEND

Aplicativo móvel do **Cofrinho**, plataforma para organização e controle de despesas compartilhadas entre grupos, com integração ao ecossistema bancário via **Open Finance** (Simulado).

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

- **Node.js** – versão recomendada para desenvolvimento
- **Git** – para clonar o repositório  
  Baixe em: https://git-scm.com/

---

## 🛠️ Tecnologias

### **Mobile / Front-end**
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.github.io/router/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) para validação de formulários
- [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native) para animações
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) e [SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) para armazenamento local seguro

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
│   │   └── forgot-password/  # Recuperação de senha
│   │   └── register/         # Cadastro de usuários
│   ├── bank-app/        
│   │   └── open-finance/  # Telas de Open Finance
│   │   └── payment/       # Processamento de pagamentos
│   ├── expense/           
│   │   └── create/        # Criação de despesas
│   │   └── view/          # Visualização de despesas
│   ├── open-finance/     
│   │   └── link-account/  # Vinculação de contas
│   │   └── link-status/   # Status de vinculação
│   ├── tabs/             
│   │   └── account/       # Perfil do usuário
│   │   └── add-funds/     # Adição de saldo
│   │   └── groups/        # Listagem de grupos
│   ├── groups/            
│   │   └── edit/          # Edição de grupos
│   │   └── members/       # Membros do grupo
│   ├── notifications/     # Centro de notificações
│   ├── transactions/      # Histórico de transações
│   └── user/              # Gerenciamento do usuário
├── assets/               
│   └── animations/        # Animações Lottie
│   └── fonts/             # Fontes customizadas
│   └── images/            # Imagens e ícones
├── components/           
├── constants/            
├── contexts/              
├── services/             
├── utils/                 # Utilitários
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

O **Cofrinho** é um aplicativo móvel que complementa o backend da plataforma para controle de despesas compartilhadas, com foco em usabilidade, segurança e integração via Open Finance.  

Construído com tecnologias modernas como React Native e Expo, o app oferece uma experiência fluida para gerenciar grupos, contas, despesas e transações financeiras de forma colaborativa e transparente.

Este projeto faz parte do desenvolvimento final da plataforma Cofrinho, demonstrando como conectar o front-end mobile com serviços financeiros modernos em um ambiente seguro e escalável.