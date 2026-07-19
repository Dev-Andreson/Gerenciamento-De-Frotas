<<<<<<< HEAD
# 🚗 Locadora de Veículos - Sistema de Gerenciamento

![Status](https://img.shields.io/badge/status-concluído-brightgreen)
![Angular](https://img.shields.io/badge/Angular-17-red)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)

Sistema completo de gerenciamento para locadora de veículos com autenticação JWT, controle de perfis (admin/comum) e CRUD completo.

## 📋 Descrição

Este projeto consiste em uma aplicação full-stack para gerenciamento de uma locadora de veículos, desenvolvida como desafio acadêmico. O sistema permite:

- 🔐 Autenticação segura com JWT
- 📊 Gerenciamento de veículos, marcas e categorias
- 👥 Controle de acesso por perfil (Administrador/Comum)
- 📈 Dashboard com resumos e métricas
- 🔍 Busca e filtros avançados
- 📱 Interface responsiva e moderna

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Descrição |
|------------|-----------|
| Node.js | Runtime JavaScript |
| Express | Framework web |
| PostgreSQL | Banco de dados relacional |
| JWT | Autenticação e autorização |
| bcrypt | Hash de senhas |
| CORS | Compartilhamento entre origens |

### Frontend
| Tecnologia | Descrição |
|------------|-----------|
| Angular 17 | Framework frontend |
| TypeScript | Superset JavaScript |
| HTML5 & CSS3 | Estrutura e estilização |
| RxJS | Programação reativa |

## 📁 Estrutura do Projeto
locadora-app/
├── backend/
│ ├── src/
│ │ ├── controllers/ # Controladores da aplicação
│ │ ├── model/ # Modelos de dados
│ │ ├── routes/ # Rotas da API
│ │ ├── validators/ # Validações de dados
│ │ ├── config/ # Configurações (DB, etc)
│ │ ├── app.js # Configuração do Express
│ │ └── servidor.js # Ponto de entrada
│ ├── package.json
│ └── .env.example # Exemplo de variáveis
│
└── frontend/
├── src/
│ ├── app/
│ │ ├── components/ # Componentes Angular
│ │ │ ├── login/
│ │ │ ├── registro/
│ │ │ ├── dashboard/
│ │ │ ├── veiculos/
│ │ │ ├── marcas/
│ │ │ ├── categorias/
│ │ │ └── navbar/
│ │ ├── services/ # Serviços (API, Auth)
│ │ ├── models/ # Interfaces TypeScript
│ │ ├── guards/ # Guards de rota
│ │ ├── interceptors/ # Interceptores HTTP
│ │ ├── app-module.ts
│ │ └── app-routing-module.ts
│ ├── assets/
│ ├── index.html
│ └── styles.css
├── package.json
└── angular.json

text

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL (v14 ou superior)
- Angular CLI (v17 ou superior)

### Passo a Passo

#### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/locadora-app.git
cd locadora-app
2. Configure o Banco de Dados
Crie um banco PostgreSQL e execute o script de criação das tabelas:

sql
-- Estrutura básica das tabelas (exemplo)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) DEFAULT 'comum',
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ... (demais tabelas: marcas, categorias, veiculos)
📝 O script completo está disponível na pasta database/schema.sql

3. Configurar Backend
bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Criar arquivo .env a partir do exemplo
cp .env.example .env

# Editar o .env com suas configurações
# DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET

# Iniciar o servidor
npm run dev
4. Configurar Frontend
bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
ng serve
Acesse http://localhost:4200 no navegador.

👥 Perfis de Usuário
Administrador
✅ Acesso completo ao sistema

✅ Pode criar, editar e excluir veículos, marcas e categorias

✅ Visualiza todos os menus

Usuário Comum
✅ Apenas visualização de dados

❌ Não pode criar, editar ou excluir

✅ Visualiza apenas o Dashboard

⚠️ Para criar um usuário administrador, insira diretamente no banco com perfil = 'admin'

🔒 Segurança
🔐 Autenticação JWT com expiração de 8 horas

🔑 Senhas hasheadas com bcrypt

🛡️ Proteção de rotas com Guards

🔄 Interceptor para envio automático do token

✅ Validação de dados em todas as entradas

📱 Funcionalidades
Páginas
Página	Descrição
Login	Autenticação de usuários
Registro	Criação de novas contas
Dashboard	Visão geral com métricas
Veículos	CRUD completo com busca e filtros
Marcas	CRUD completo com busca
Categorias	CRUD completo com busca
Recursos
✅ Paginação na lista de veículos

✅ Busca por modelo, marca e categoria

✅ Filtros por preço e ano

✅ Notificações de sucesso/erro

✅ Confirmação para exclusões

✅ Design responsivo

📡 API Endpoints
Autenticação
Método	Endpoint	Descrição	Auth
POST	/api/login	Login de usuário	❌
POST	/api/registro	Cadastro de usuário	❌
Veículos
Método	Endpoint	Descrição	Auth
GET	/api/veiculos	Listar veículos (paginado)	✅
GET	/api/veiculos/:id	Buscar veículo por ID	✅
GET	/api/veiculo/	Buscar por modelo	✅
GET	/api/veiculos/disponiveis	Listar disponíveis	✅
POST	/api/veiculos	Criar veículo	👑
PUT	/api/veiculos/editar/:id	Atualizar veículo	👑
DELETE	/api/veiculos/:id	Excluir veículo	👑
Marcas
Método	Endpoint	Descrição	Auth
GET	/api/marcas	Listar marcas	✅
GET	/api/marcas/:id	Buscar marca por ID	✅
GET	/api/marca/	Buscar por nome	✅
POST	/api/marca	Criar marca	👑
PUT	/api/marca/:id	Atualizar marca	👑
DELETE	/api/marca/:id	Excluir marca	👑
Categorias
Método	Endpoint	Descrição	Auth
GET	/api/categorias	Listar categorias	✅
GET	/api/categoria/:id	Buscar categoria por ID	✅
POST	/api/categoria	Criar categoria	👑
PUT	/api/categoria/:id	Atualizar categoria	👑
DELETE	/api/categoria/:id	Excluir categoria	👑
Legenda:

❌ = Público (sem autenticação)

✅ = Autenticado (qualquer usuário)

👑 = Apenas administradores

🚢 Deploy
Opções de Deploy
Serviço	Tipo	Facilidade
Render + Vercel	Backend + Frontend	⭐⭐⭐
Railway	Full Stack	⭐⭐⭐⭐⭐
Netlify + Heroku	Frontend + Backend	⭐⭐⭐⭐
Deploy no Render (Backend)
Crie uma conta no Render

Conecte seu repositório GitHub

Selecione "Web Service"

Configure:

Build Command: npm install

Start Command: npm start

Adicione as variáveis de ambiente

Crie um banco PostgreSQL no Render

Deploy no Vercel (Frontend)
bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer deploy
cd frontend
vercel --prod
Deploy no Railway (Full Stack)
Crie uma conta no Railway

Conecte seu repositório GitHub

Adicione o serviço do backend

Adicione um banco PostgreSQL

Adicione o serviço do frontend

📝 Consulte a documentação completa de deploy para mais detalhes

📋 Variáveis de Ambiente
Backend (.env)
env
PORT=3000
DB_HOST=seu_host
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=locadora_db
JWT_SECRET=seu_jwt_secret
Frontend (src/environments/environment.ts)
typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
⚠️ NUNCA commite arquivos .env ou com credenciais reais!

🤝 Contribuindo
Faça um fork do projeto

Crie uma branch para sua feature (git checkout -b feature/nova-feature)

Commit suas alterações (git commit -m 'Adiciona nova feature')

Push para a branch (git push origin feature/nova-feature)

Abra um Pull Request

📝 Licença
Este projeto foi desenvolvido como desafio acadêmico e está disponível para fins educacionais.

👨‍💻 Autor
**Andreson Rodrigues**  
[GitHub](https://github.com/Dev-Andreson)  
[LinkedIn](https://www.linkedin.com/in/andreson-rodrigues-50a915364)

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!
=======
# Gerenciamento-De-Frotas
Sistema completo de gestão de locadora de veículos - Backend (Node.js/PostgreSQL) + Frontend (Angular)
>>>>>>> 71a68da75a8ecf20f60cbbdb49cac4c8c0269879
