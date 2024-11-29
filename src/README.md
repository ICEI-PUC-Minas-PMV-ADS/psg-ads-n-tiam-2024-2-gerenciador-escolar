# Documentação das Rotas da API

## Rotas de Usuário (UserController)

### GET /api/User/GetUsers
- **Descrição**: Retorna todos os usuários cadastrados
- **Acesso**: Apenas Secretários
- **Resposta de Sucesso**: Lista de usuários (200)
- **Respostas de Erro**: 
  - 403: Usuário sem permissão
  - 404: Nenhum usuário encontrado
  - 500: Erro interno do servidor

### GET /api/User/GetUser
- **Descrição**: Retorna um usuário específico por ID
- **Parâmetros**: id (string)
- **Acesso**: Apenas Secretários
- **Resposta de Sucesso**: Dados do usuário (200)
- **Respostas de Erro**:
  - 403: Usuário sem permissão
  - 404: Usuário não encontrado
  - 500: Erro interno do servidor

### POST /api/User/CreateUser
- **Descrição**: Cria um novo usuário
- **Corpo**: UserModel
- **Acesso**: Apenas Secretários
- **Resposta de Sucesso**: Usuário criado (201)
- **Respostas de Erro**:
  - 400: Campos inválidos ou senha não atende aos padrões
  - 403: Usuário sem permissão
  - 409: Email já em uso
  - 500: Erro interno do servidor

### PUT /api/User/UpdateUser
- **Descrição**: Atualiza dados de um usuário
- **Corpo**: UserModel
- **Acesso**: Apenas Secretários
- **Resposta de Sucesso**: Usuário atualizado (200)
- **Respostas de Erro**:
  - 400: Campos inválidos ou senha não atende aos padrões
  - 403: Usuário sem permissão
  - 409: Email já em uso
  - 500: Erro interno do servidor

### DELETE /api/User/DeleteUser
- **Descrição**: Remove um usuário
- **Parâmetros**: id (string)
- **Acesso**: Apenas Secretários
- **Resposta de Sucesso**: Usuário deletado (204)
- **Respostas de Erro**:
  - 403: Usuário sem permissão
  - 404: Usuário não encontrado
  - 500: Erro interno do servidor

## Rotas de Login (LoginController)

### POST /api/Login/Login
- **Descrição**: Realiza login do usuário
- **Corpo**: LoginModel (email e senha)
- **Resposta de Sucesso**: Tipo do usuário (200)
- **Respostas de Erro**:
  - 400: Email ou senha inválidos
  - 500: Erro interno do servidor

### GET /api/Login/GetSession
- **Descrição**: Retorna dados da sessão atual
- **Resposta de Sucesso**: Dados da sessão (200)
- **Respostas de Erro**:
  - 400: Nenhum usuário conectado
  - 404: Usuário não encontrado
  - 500: Erro interno do servidor

### POST /api/Login/RequestPassword
- **Descrição**: Solicita redefinição de senha
- **Parâmetros**: email (string)
- **Resposta de Sucesso**: Email enviado (202)
- **Respostas de Erro**:
  - 400: Email não fornecido
  - 404: Email não encontrado
  - 500: Erro interno do servidor

### POST /api/Login/Logout
- **Descrição**: Realiza logout do usuário
- **Resposta de Sucesso**: Logout realizado (200)
- **Respostas de Erro**:
  - 404: Sessão não encontrada
  - 500: Erro interno do servidor

## Rotas de Turma (ClassController)

### GET /api/Class/GetClasses
- **Descrição**: Retorna todas as turmas
- **Acesso**: Usuários autenticados
- **Resposta de Sucesso**: Lista de turmas (200)
- **Respostas de Erro**:
  - 403: Usuário não autenticado
  - 404: Nenhuma turma encontrada
  - 500: Erro interno do servidor

### POST /api/Class/CreateClass
- **Descrição**: Cria uma nova turma
- **Corpo**: ClassModel
- **Acesso**: Apenas Secretários
- **Resposta de Sucesso**: Turma criada (201)
- **Respostas de Erro**:
  - 400: Campos inválidos ou turma já existe
  - 403: Usuário sem permissão
  - 404: Usuário não conectado
  - 500: Erro interno do servidor

### PUT /api/Class/InsertStudent
- **Descrição**: Adiciona um aluno a uma turma
- **Parâmetros**: className (string), studentName (string)
- **Acesso**: Apenas Secretários
- **Resposta de Sucesso**: Aluno inserido (201)
- **Respostas de Erro**:
  - 403: Usuário sem permissão ou usuário não é aluno
  - 404: Turma ou aluno não encontrado
  - 500: Erro interno do servidor

## Rotas de Notas (GradeController)
- **Observação**: Controlador existente mas sem rotas implementadas 
