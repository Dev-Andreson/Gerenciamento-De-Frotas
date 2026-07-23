# 🚗 Gerenciamento de Frotas

<p align="center">
  Sistema completo para gerenciamento de uma locadora de veículos, desenvolvido com <strong>Angular</strong>, <strong>Node.js</strong> e <strong>PostgreSQL</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-concluído-brightgreen" alt="Status">
  <img src="https://img.shields.io/badge/Angular-17-red" alt="Angular">
  <img src="https://img.shields.io/badge/Node.js-18-green" alt="Node.js">
  <img src="https://img.shields.io/badge/PostgreSQL-14-blue" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/TypeScript-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/license-MIT-yellow" alt="License">
</p>

---

## 📖 Sobre o Projeto

O **Gerenciamento de Frotas** é uma aplicação Full Stack desenvolvida para facilitar o gerenciamento de uma locadora de veículos.

O sistema possui autenticação de usuários, controle de acesso baseado em perfil, gerenciamento de veículos, marcas e categorias, além de um dashboard com informações gerais do sistema.

O projeto foi desenvolvido como parte de um **desafio acadêmico**, utilizando uma arquitetura dividida entre **Frontend** e **Backend**, com comunicação através de uma API REST.

---

## ✨ Funcionalidades

### 🔐 Autenticação e Usuários

* Login de usuários
* Cadastro de novos usuários
* Autenticação utilizando JWT
* Controle de acesso por perfil
* Proteção de rotas
* Hash de senhas utilizando bcrypt
* Expiração do token de autenticação

### 🚗 Gerenciamento de Veículos

* Cadastro de veículos
* Edição de veículos
* Exclusão de veículos
* Listagem de veículos
* Busca por modelo
* Filtros por marca e categoria
* Filtros por preço e ano
* Controle de disponibilidade
* Paginação

### 🏷️ Gerenciamento de Marcas

* Cadastro de marcas
* Edição de marcas
* Exclusão de marcas
* Listagem de marcas
* Busca por nome

### 📂 Gerenciamento de Categorias

* Cadastro de categorias
* Edição de categorias
* Exclusão de categorias
* Listagem de categorias
* Busca por nome

### 📊 Dashboard

* Visão geral do sistema
* Resumo dos veículos cadastrados
* Informações sobre marcas e categorias
* Métricas gerais da aplicação

### 📱 Interface

* Design responsivo
* Interface moderna
* Notificações de sucesso e erro
* Confirmação antes de exclusões

---

## 🛠️ Tecnologias Utilizadas

### Frontend

| Tecnologia        | Utilização                                  |
| ----------------- | ------------------------------------------- |
| Angular 17        | Framework para desenvolvimento da aplicação |
| TypeScript        | Linguagem principal                         |
| HTML5             | Estrutura das páginas                       |
| CSS3              | Estilização e responsividade                |
| RxJS              | Programação reativa                         |
| Angular Router    | Gerenciamento de rotas                      |
| HTTP Interceptors | Gerenciamento de requisições HTTP           |
| Route Guards      | Proteção das rotas                          |

### Backend

| Tecnologia | Utilização                             |
| ---------- | -------------------------------------- |
| Node.js    | Runtime JavaScript                     |
| Express.js | Framework para construção da API       |
| PostgreSQL | Banco de dados relacional              |
| JWT        | Autenticação e autorização             |
| bcrypt     | Criptografia de senhas                 |
| CORS       | Controle de acesso entre origens       |
| dotenv     | Gerenciamento de variáveis de ambiente |

---

## 🏗️ Arquitetura do Projeto

O projeto está dividido em duas aplicações principais:

```text
Gerenciamento-De-Frotas/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── model/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── config/
│   │   ├── app.js
│   │   └── servidor.js
│   │
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── login/
│   │   │   │   ├── registro/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── veiculos/
│   │   │   │   ├── marcas/
│   │   │   │   ├── categorias/
│   │   │   │   └── navbar/
│   │   │   │
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── app-module.ts
│   │   │   └── app-routing-module.ts
│   │   │
│   │   ├── assets/
│   │   ├── index.html
│   │   └── styles.css
│   │
│   ├── package.json
│   └── angular.json
│
└── README.md
```

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/) v18 ou superior
* [PostgreSQL](https://www.postgresql.org/) v14 ou superior
* Angular CLI v17 ou superior
* Git

---

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/Dev-Andreson/Gerenciamento-De-Frotas.git
```

Entre na pasta do projeto:

```bash
cd Gerenciamento-De-Frotas
```

---

### 2️⃣ Configure o Banco de Dados

Crie um banco de dados PostgreSQL para o projeto.

Em seguida, execute os scripts SQL disponíveis no projeto para criação das tabelas e inserção dos dados iniciais.

Exemplo:

```sql
CREATE DATABASE locadora_db;
```

> 💡 Certifique-se de que o PostgreSQL esteja em execução antes de iniciar o Backend.

---

### 3️⃣ Configure o Backend

Entre na pasta do Backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Configure as variáveis de ambiente:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=locadora_db

JWT_SECRET=seu_jwt_secret
```

Inicie o servidor:

```bash
npm run dev
```

O Backend estará disponível em:

```text
http://localhost:3000
```

---

### 4️⃣ Configure o Frontend

Abra outro terminal e entre na pasta do Frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o Angular:

```bash
ng serve
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

---

## 👥 Perfis de Usuário

O sistema possui dois níveis de acesso:

### 👑 Administrador

Possui acesso completo ao sistema.

* ✅ Visualizar Dashboard
* ✅ Visualizar veículos
* ✅ Criar veículos
* ✅ Editar veículos
* ✅ Excluir veículos
* ✅ Gerenciar marcas
* ✅ Gerenciar categorias

### 👤 Usuário Comum

Possui acesso limitado às funcionalidades do sistema.

* ✅ Visualizar Dashboard
* ✅ Consultar veículos
* ✅ Consultar marcas
* ✅ Consultar categorias
* ❌ Não pode criar registros
* ❌ Não pode editar registros
* ❌ Não pode excluir registros

> ⚠️ O perfil do usuário é definido através do campo `perfil` no banco de dados.

---

## 🔒 Segurança

A aplicação possui mecanismos de segurança para proteger os dados e as funcionalidades do sistema:

* 🔐 Autenticação utilizando JWT
* ⏱️ Expiração do token de autenticação
* 🔑 Senhas protegidas com bcrypt
* 🛡️ Proteção de rotas através de Guards
* 🔄 HTTP Interceptor para envio automático do token
* ✅ Validação de dados
* 🔒 Controle de acesso baseado em perfil
* 🌐 Configuração de CORS

---

## 📡 API REST

### 🔐 Autenticação

| Método | Endpoint        | Descrição         | Autenticação |
| ------ | --------------- | ----------------- | ------------ |
| `POST` | `/api/login`    | Realizar login    | ❌            |
| `POST` | `/api/registro` | Registrar usuário | ❌            |

### 🚗 Veículos

| Método   | Endpoint                    | Descrição                   | Acesso |
| -------- | --------------------------- | --------------------------- | ------ |
| `GET`    | `/api/veiculos`             | Listar veículos             | 🔐     |
| `GET`    | `/api/veiculos/:id`         | Buscar veículo por ID       | 🔐     |
| `GET`    | `/api/veiculo/`             | Buscar veículo por modelo   | 🔐     |
| `GET`    | `/api/veiculos/disponiveis` | Listar veículos disponíveis | 🔐     |
| `POST`   | `/api/veiculos`             | Criar veículo               | 👑     |
| `PUT`    | `/api/veiculos/editar/:id`  | Atualizar veículo           | 👑     |
| `DELETE` | `/api/veiculos/:id`         | Excluir veículo             | 👑     |

### 🏷️ Marcas

| Método   | Endpoint          | Descrição             | Acesso |
| -------- | ----------------- | --------------------- | ------ |
| `GET`    | `/api/marcas`     | Listar marcas         | 🔐     |
| `GET`    | `/api/marcas/:id` | Buscar marca por ID   | 🔐     |
| `GET`    | `/api/marca/`     | Buscar marca por nome | 🔐     |
| `POST`   | `/api/marca`      | Criar marca           | 👑     |
| `PUT`    | `/api/marca/:id`  | Atualizar marca       | 👑     |
| `DELETE` | `/api/marca/:id`  | Excluir marca         | 👑     |

### 📂 Categorias

| Método   | Endpoint             | Descrição               | Acesso |
| -------- | -------------------- | ----------------------- | ------ |
| `GET`    | `/api/categorias`    | Listar categorias       | 🔐     |
| `GET`    | `/api/categoria/:id` | Buscar categoria por ID | 🔐     |
| `POST`   | `/api/categoria`     | Criar categoria         | 👑     |
| `PUT`    | `/api/categoria/:id` | Atualizar categoria     | 👑     |
| `DELETE` | `/api/categoria/:id` | Excluir categoria       | 👑     |

### 🔑 Legenda

* ❌ Público — Não exige autenticação
* 🔐 Autenticado — Usuários autenticados
* 👑 Administrador — Apenas usuários administradores

---

## 🌐 Variáveis de Ambiente

### Backend

Arquivo `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=locadora_db

JWT_SECRET=seu_jwt_secret
```

### Frontend

Arquivo:

```text
src/environments/environment.ts
```

Exemplo:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

> ⚠️ **Importante:** Nunca envie arquivos `.env` ou credenciais reais para o GitHub.

---

## 🚢 Deploy

O projeto pode ser publicado utilizando diferentes serviços de hospedagem.

### Backend

Algumas opções:

* Render
* Railway
* Heroku

### Frontend

Algumas opções:

* Vercel
* Netlify
* Firebase Hosting

### Banco de Dados

Algumas opções:

* PostgreSQL no Railway
* PostgreSQL no Render
* Supabase

> 💡 Para ambientes de produção, configure corretamente as variáveis de ambiente e altere a URL da API no Frontend.

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

Para contribuir:

### 1. Faça um Fork do projeto

### 2. Crie uma nova branch

```bash
git checkout -b feature/minha-feature
```

### 3. Faça suas alterações

### 4. Realize o commit

```bash
git commit -m "Adiciona nova feature"
```

### 5. Envie para o GitHub

```bash
git push origin feature/minha-feature
```

### 6. Abra um Pull Request

---

## 📄 Licença

Este projeto foi desenvolvido como parte de um **desafio acadêmico** e está disponível para fins educacionais.

---

## 👨‍💻 Autor

### Andreson Rodrigues

Desenvolvedor Full Stack em formação, interessado em desenvolvimento de aplicações web e construção de soluções utilizando tecnologias modernas.

🔗 **GitHub:** [Dev-Andreson](https://github.com/Dev-Andreson)

🔗 **LinkedIn:** [Andreson Rodrigues](https://www.linkedin.com/in/andreson-rodrigues-50a915364)

---

<p align="center">
  Desenvolvido com 💻 e ☕ por <strong>Andreson Rodrigues</strong>
</p>

<p align="center">
  ⭐ Se este projeto foi útil para você, considere deixar uma estrela no repositório!
</p>
