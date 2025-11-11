# 🗣️ Talker Manager – Node.js + Express + Zod + Jest

API completa para gerenciar palestrantes ("talkers"). O projeto expõe endpoints autenticados para **CRUD**, busca por nome e filtros por nota/data, usando validações com **Zod**, persistência em arquivo com **fs** e suíte de testes em **Jest/Frisby**. Ideal para exercitar middlewares, boas práticas REST e fluxo de autenticação baseado em token.

---

## 🚀 Tecnologias Utilizadas

- **Node.js + Express** – Criação dos endpoints REST.
- **Zod** – Validação declarativa do corpo de requisições e headers.
- **fs/promises** – Persistência em `src/talker.json` sem banco relacional.
- **Docker + Docker Compose** – Ambiente de execução isolado.
- **Jest + Frisby** – Testes automatizados de integração dos endpoints.
- **ESLint (Trybe config)** – Garantia de estilo e padrões do projeto.

---

## 📂 Estrutura do Projeto

```plaintext
sd-040-project-talker-manager/
├─ docker-compose.yml
├─ Dockerfile
├─ src/
│  ├─ index.js              # Servidor Express + rotas e middlewares
│  ├─ talker.json           # "Banco" de dados baseado em arquivo
│  └─ validations/
│     ├─ schemaLogin.js     # Schema de login (email/senha)
│     └─ schemaTaker.js     # Schemas de token e talkers (name/age/talk)
├─ __tests__/               # Testes fornecidos (Jest + Frisby)
├─ README.md
└─ package.json
```

---

## ⚙️ Funcionalidades

- [x] **Login** (`POST /login`) com geração de token aleatório de 16 caracteres.
- [x] **CRUD de palestrantes** (`/talker`, `/talker/:id`) com leitura/escrita no `talker.json`.
- [x] **Busca com query params** (`/talker/search?q=&rate=`) aplicando filtros combinados.
- [x] **Validações robustas** (campos obrigatórios, formatos de data, notas 1–5, maioridade).
- [x] **Middlewares de autenticação** (token obrigatório em todas as rotas privadas).
- [x] **Testes automatizados** para cada requisito (1 a 12) usando Frisby.

---

## 🧠 Destaques Técnicos

- **Zod** simplifica as mensagens personalizadas exigidas pelos requisitos e evita regex manuais.
- **Persistência simplificada**: toda alteração do `PUT/POST/DELETE` reescreve o JSON com `fs.writeFileSync` formatado.
- **Middlewares reutilizáveis** para token, login e payload de talkers reduzindo duplicação.
- **Busca flexível**: `GET /talker/search` aplica filtros independentes, valida `rate` e respeita casos de `q` vazio/não enviado.

---

## 🐳 Executando com Docker

```bash
docker-compose up -d             # sobe backend + mysql (quando necessário)
docker exec -it talker_manager bash
npm run dev                     # inicia servidor com nodemon
```

Testes dentro do container:

```bash
docker exec -it talker_manager bash
npm run lint
npm test              # roda todos os testes
npm test "05"         # roda apenas o requisito desejado
```

---

## 💻 Executando localmente (sem Docker)

1. **Pré-requisito**: Node 16.
2. Copie o `.env` base: `cp env.example .env` (ajuste se necessário).
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   env $(cat .env) npm run dev
   ```
5. Rode os testes/lint:
   ```bash
   npm run lint
   env $(cat .env) npm test
   ```

---

## 📡 Endpoints Principais

| Método | Rota                | Descrição                                               |
|--------|--------------------|---------------------------------------------------------|
| POST   | `/login`           | Valida email/senha e gera token de 16 caracteres.       |
| GET    | `/talker`          | Lista todas as pessoas palestrantes.                    |
| GET    | `/talker/:id`      | Busca palestrante pelo ID.                              |
| POST   | `/talker`          | Cria nova pessoa palestrante (token + payload válidos). |
| PUT    | `/talker/:id`      | Atualiza dados existentes.                              |
| DELETE | `/talker/:id`      | Remove palestrante e persiste em arquivo.               |
| GET    | `/talker/search`   | Filtra por `q` (nome) e/ou `rate` (1–5).                |

Todos os endpoints, exceto `/login`, exigem header `Authorization` com token válido.

---

## ✅ Testes Automatizados

O diretório `__tests__` contém 12 suítes cobrindo cada requisito. Exemplos de uso:

```bash
npm test "01"   # GET /talker
npm test "05"   # POST /talker
npm test "09"   # /talker/search com rate
```

Os testes utilizam **Frisby** para enviar requisições reais ao servidor em execução.

---

## 🎯 Objetivos do Projeto

- Exercitar construção de APIs REST com Express.
- Aplicar validações server-side sem dependência de banco relacional.
- Praticar middleware, autenticação via token e fluxo CRUD completo.
- Dominar a execução de testes automatizados orientados a requisitos.

---

## 📜 Licença

Projeto disponível para fins educacionais. Sinta-se à vontade para clonar, estudar e adaptar.

---

## 📫 Contato

- GitHub: [@chapetta](https://github.com/chapetta)
- LinkedIn: [Yan Chapetta](https://www.linkedin.com/in/yan-chapetta)
- Email: **cha.petta@hotmail.com**

Se este repositório foi útil, considere deixar uma ⭐ no GitHub!
