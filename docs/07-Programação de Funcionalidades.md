# Programação de Funcionalidades

## Banco de Dados

Nosso banco de dados está sendo desenvolvido inteiramente no Firebase, utilizando o `Firestore Database` para armazenar os dados da aplicação e o `Firebase Authentication` para armazenar os acessos dos usuários.

![image](https://github.com/user-attachments/assets/0b2ad4a1-72ed-4b7d-94ac-d00f64003eec)
![image](https://github.com/user-attachments/assets/f910335e-7398-4a63-8033-dc2b871b605c)
![image](https://github.com/user-attachments/assets/040b5b20-3b1b-48c3-9264-e666fe779d62)

Como estamos trabalhando com dados NoSql, a manipulação dos dados é bem maleável, sendo intemediadas por bibliotecas que facilitam a conexão, como `Google.Cloud.Firestore` para conectar com o Firestore e `Firebase.Auth` para conectar com o Firebase Authentication. (Estamos desenvolvendo o backend com C#)

## Funcionalidade de Telas

Para o desenvolvimento das telas do aplicativo estamos utilizando o `React Native`, facilitando a integração com o Android e IOS simultaneamente.

![image](https://github.com/user-attachments/assets/e4161d1a-57f4-4d52-a908-547cd1fb4dd1)
![image](https://github.com/user-attachments/assets/55d384e3-623d-4e40-bfb6-c385990633c1)

## Lógica da Aplicação

Já na parte de desenvolviento das funcionalidades, estamos utilizando o `C#`, já que é uma linguagem familiar para todos do grupo, facilitando o desenvolvimento do backend da aplicação.

- Rota para o Login

![image](https://github.com/user-attachments/assets/42b427a7-1b98-406c-a0be-922bdfe06a1e)

Como mostrado no exemplo temos a camada da controller que será acionada pelo frontend fazendo a ponte entre o backend e o Firebase Authentication.

- Rota para inserir aluno em uma sala

![image](https://github.com/user-attachments/assets/cc56d0de-d512-4c87-b602-ecc5be686365)

![image](https://github.com/user-attachments/assets/9bb49b04-8d10-4f58-a70a-aa61a5b41794)

Já nesse caso a controller aciona uma classe na camada de service, e ela quem faz a ponte com o banco de dados, para inserir o aluno na turma.

- Rotas da aplicação

![image](https://github.com/user-attachments/assets/7bba1163-1c78-43e9-809d-55d467713270)

Essas são todas as rotas da aplicação até o momento.

## Gestão do Trabalho

- Quadro de desenvolvimento do frontend
![image](https://github.com/user-attachments/assets/281bfd38-b931-49d8-813d-b37de7f69603)

- Quadro de desenvolvimento do backend

![image](https://github.com/user-attachments/assets/6db1e372-0eed-4fb9-9052-871000ed7e4b)

- Fluxo de contribuição

![image](https://github.com/user-attachments/assets/049f602f-b932-4dd5-844b-d44c26ef6e57)


