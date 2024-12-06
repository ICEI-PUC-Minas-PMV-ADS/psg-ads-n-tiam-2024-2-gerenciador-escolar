# Rotas da API do Instituto Copacabana

## 1. Login

#### Login de Usuário
- **`POST /api/Login/Login`**
- **Descrição:** Realiza autenticação do usuário na plataforma.
- **Parâmetros no Body (JSON):**
  - `email`: (string) - Email do usuário
  - `password`: (string) - Senha do usuário
- **Resposta:**
  - `200 OK`: Usuário autenticado com sucesso
  - `400 Bad Request`: Email ou senha inválidos
  - `500 Internal Server Error`: Erro ao fazer login

##### Exemplo de Requisição:
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

#### Recuperar Senha
- **`POST /api/Login/RequestPassword`**
- **Descrição:** Envia email para recuperação de senha.
- **Parâmetros no Body:**
  - `email`: (string) - Email do usuário
- **Resposta:**
  - `202 Accepted`: Email de recuperação enviado
  - `400 Bad Request`: Email não fornecido
  - `404 Not Found`: Email não encontrado
  - `500 Internal Server Error`: Erro ao enviar email

#### Obter Sessão Atual
- **`GET /api/Login/GetSession`**
- **Descrição:** Retorna dados do usuário conectado.
- **Resposta:**
  - `200 OK`: Retorna dados da sessão
  - `400 Bad Request`: Nenhum usuário conectado
  - `404 Not Found`: Usuário não encontrado
  - `500 Internal Server Error`: Erro interno do servidor

#### Logout
- **`POST /api/Login/Logout`**
- **Descrição:** Encerra a sessão do usuário.
- **Resposta:**
  - `200 OK`: Logout realizado com sucesso
  - `404 Not Found`: Sessão não encontrada
  - `500 Internal Server Error`: Erro interno do servidor

## 2. Usuários

#### Listar Usuários
- **`GET /api/User/GetUsers`**
- **Descrição:** Retorna todos os usuários cadastrados.
- **Resposta:**
  - `200 OK`: Lista de usuários retornada
  - `403 Forbidden`: Usuário sem permissão
  - `404 Not Found`: Nenhum usuário encontrado
  - `500 Internal Server Error`: Erro interno do servidor

#### Buscar Usuário
- **`GET /api/User/GetUser`**
- **Descrição:** Busca um usuário específico pelo ID.
- **Parâmetros na Query:**
  - `id`: (string) - ID do usuário
- **Resposta:**
  - `200 OK`: Dados do usuário
  - `403 Forbidden`: Usuário sem permissão
  - `404 Not Found`: Usuário não encontrado
  - `500 Internal Server Error`: Erro interno do servidor

#### Criar Usuário
- **`POST /api/User/CreateUser`**
- **Descrição:** Cria um novo usuário no sistema.
- **Parâmetros no Body (JSON):**
  - `name`: (string) - Nome do usuário
  - `email`: (string) - Email do usuário
  - `password`: (string) - Senha do usuário
  - `userType`: (string) - Tipo do usuário (Secretary/Teacher/Student)
- **Resposta:**
  - `201 Created`: Usuário criado com sucesso
  - `400 Bad Request`: Campos inválidos ou senha não atende padrões
  - `403 Forbidden`: Usuário sem permissão
  - `409 Conflict`: Email já em uso
  - `500 Internal Server Error`: Erro interno do servidor

##### Exemplo de Requisição:
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "Senha@123",
  "userType": "Student"
}
```

#### Atualizar Usuário
- **`PUT /api/User/UpdateUser`**
- **Descrição:** Atualiza dados de um usuário existente.
- **Parâmetros no Body (JSON):**
  - `id`: (string) - ID do usuário
  - `name`: (string) - Nome do usuário
  - `email`: (string) - Email do usuário
  - `password`: (string) - Senha do usuário
  - `userType`: (string) - Tipo do usuário
- **Resposta:**
  - `200 OK`: Usuário atualizado com sucesso
  - `400 Bad Request`: Campos inválidos
  - `403 Forbidden`: Usuário sem permissão
  - `409 Conflict`: Email já em uso
  - `500 Internal Server Error`: Erro interno do servidor

##### Exemplo de Requisição:
```json
{
  "id": "abc123",
  "name": "João Silva",
  "email": "joao.novo@exemplo.com",
  "password": "NovaSenha@123",
  "userType": "Student"
}
```

#### Excluir Usuário
- **`DELETE /api/User/DeleteUser`**
- **Descrição:** Remove um usuário do sistema.
- **Parâmetros na Query:**
  - `id`: (string) - ID do usuário
- **Resposta:**
  - `204 No Content`: Usuário deletado com sucesso
  - `403 Forbidden`: Usuário sem permissão
  - `404 Not Found`: Usuário não encontrado
  - `500 Internal Server Error`: Erro interno do servidor

## 3. Turmas

#### Listar Turmas
- **`GET /api/Class/GetClasses`**
- **Descrição:** Retorna todas as turmas cadastradas.
- **Resposta:**
  - `200 OK`: Lista de turmas
  - `403 Forbidden`: Usuário não autenticado
  - `404 Not Found`: Nenhuma turma encontrada
  - `500 Internal Server Error`: Erro interno do servidor

#### Criar Turma
- **`POST /api/Class/CreateClass`**
- **Descrição:** Cria uma nova turma.
- **Parâmetros no Body (JSON):**
  - `name`: (string) - Nome da turma
- **Resposta:**
  - `201 Created`: Turma criada com sucesso
  - `400 Bad Request`: Campos inválidos
  - `403 Forbidden`: Usuário sem permissão
  - `500 Internal Server Error`: Erro interno do servidor

##### Exemplo de Requisição:
```json
{
  "name": "Turma A"
}
```

#### Inserir Aluno na Turma
- **`PUT /api/Class/InsertStudent`**
- **Descrição:** Adiciona um aluno a uma turma existente.
- **Parâmetros na Query:**
  - `className`: (string) - Nome da turma
  - `studentName`: (string) - Nome do aluno
- **Resposta:**
  - `201 Created`: Aluno inserido com sucesso
  - `403 Forbidden`: Usuário sem permissão
  - `404 Not Found`: Turma ou aluno não encontrado
  - `500 Internal Server Error`: Erro interno do servidor
