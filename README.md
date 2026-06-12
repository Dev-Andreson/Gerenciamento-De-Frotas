# 🚗 Gerenciamento de Frotas - Locadora de Veículos

Sistema fullstack para gerenciamento de uma locadora de veículos, desenvolvido como parte de um desafio técnico.

## 🎯 Funcionalidades

### Backend (Node.js + Express + PostgreSQL)
- API REST com CRUD completo para Veículos, Marcas e Categorias
- Validações de dados e tratamento de erros
- Paginação e filtros avançados
- Soft delete (ativo/inativo)

### Frontend (Angular + Bootstrap)
- Autenticação JWT (login com perfis)
- Dashboard com métricas e últimos veículos
- CRUD completo com interfaces responsivas
- Filtros por modelo, ano, faixa de preço
- Controle de acesso (Admin/Usuário comum)

## 🛠️ Tecnologias

**Backend:**
- Node.js
- Express
- PostgreSQL
- JWT (autenticação)
- pg (conexão com banco)

**Frontend:**
- Angular 17+
- Bootstrap 5 / TailwindCSS
- RxJS
- HttpClient

## 📁 Estrutura do Projeto
gerenciamento-frotas/
├── backend/ # API Node.js
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── validators/
│ │ └── config/
│ └── server.js
│
└── frontend/ # Aplicação Angular
├── src/
│ ├── app/
│ │ ├── components/
│ │ ├── services/
│ │ ├── guards/
│ │ └── interceptors/
│ └── assets/
└── angular.json

## 🚀 Como executar

### Backend
```bash
cd backend
npm install
cp .env.example .env
# configurar variáveis de ambiente
npm run dev

cd frontend
npm install
ng serve


---

## 🔧 Configuração inicial do repositório

### 1. Criar o repositório no GitHub

Pelo site do GitHub:
1. Clique em **"New repository"**
2. Nome: `gerenciamento-frotas`
3. Descrição: (use a sugestão acima)
4. Público ou Privado? (sugiro **Privado** por ser desafio técnico)
5. Não inicializar com README (vamos criar localmente)

### 2. Estrutura inicial local

```bash
# Criar pasta principal
mkdir gerenciamento-frotas
cd gerenciamento-frotas

# Inicializar git
git init

# Criar README
echo "# Gerenciamento de Frotas" > README.md

# Criar estrutura de pastas
mkdir backend frontend
touch .gitignore
