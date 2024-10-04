# Arquitetura da Solução
## Diagrama de Classes

![Untitled (1)](https://github.com/user-attachments/assets/1655012a-bc3a-46ad-b77b-6022671425bf)



## Modelo ER
![Untitled](https://github.com/user-attachments/assets/825adafb-0b31-4429-ae92-3b3807a38997)




## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico
```sql
CREATE TABLE aluno (
    id_aluno INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    endereco VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE professor (
    id_professor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100),
    telefone VARCHAR(20)
);

CREATE TABLE disciplina (
    id_disciplina INT PRIMARY KEY AUTO_INCREMENT,
    nome_disciplina VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE turma (
    id_turma INT PRIMARY KEY AUTO_INCREMENT,
    nome_turma VARCHAR(50) NOT NULL,
    descricao TEXT
);

CREATE TABLE nota (
    id_nota INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT,
    id_disciplina INT,
    nota FLOAT NOT NULL,
    data_registro DATE NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina)
);

CREATE TABLE presenca (
    id_presenca INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT,
    id_turma INT,
    data_presenca DATE NOT NULL,
    status_presenca ENUM('presente', 'ausente') NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
    FOREIGN KEY (id_turma) REFERENCES turma(id_turma)
);

CREATE TABLE professor_disciplina (
    id_professor INT,
    id_disciplina INT,
    PRIMARY KEY (id_professor, id_disciplina),
    FOREIGN KEY (id_professor) REFERENCES professor(id_professor),
    FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina)
);

```
## Tecnologias Utilizadas

Backend: Python (Flask) para lidar com as APIs que se comunicam com o Firebase, permitindo o acesso e manipulação dos dados.

Banco de Dados: Firebase para armazenar as informações de alunos, notas, presenças, etc.

Frontend: React Native para o desenvolvimento do aplicativo mobile.

## Qualidade de Software

## Características e Subcaracterísticas de Qualidade para o Projeto de Software

### 1. Funcionalidade
- **Adequação Funcional**: O sistema deve atender às necessidades de registro de notas e presença.
- **Precisão**: Os dados inseridos devem refletir a realidade do desempenho e presença.
- **Interoperabilidade**: O sistema deve ser compatível com outros sistemas da escola.

### 2. Confiabilidade
- **Maturidade**: O sistema deve ter baixa ocorrência de falhas.
- **Disponibilidade**: Garantir disponibilidade mínima de 95%.
- **Tolerância a Falhas**: Operação correta mesmo em caso de erro, evitando perda de dados.

### 3. Usabilidade
- **Inteligibilidade**: O sistema deve ser fácil de entender e usar.
- **Apreensibilidade**: Os usuários devem aprender rapidamente a utilizar o sistema.
- **Operabilidade**: A interface deve ser simples e permitir uso eficiente com mínimo esforço.

### 4. Eficiência de Desempenho
- **Tempo de Resposta**: Respostas e carregamentos em menos de 5 segundos.
- **Utilização de Recursos**: Otimizar o uso de hardware e software nos dispositivos.
- **Capacidade**: Suportar até 5.000 usuários simultâneos.

### 5. Segurança
- **Confidencialidade**: Apenas usuários autorizados acessam dados sensíveis.
- **Integridade**: Proteção contra alterações indevidas de dados.
- **Autenticidade**: Autenticar corretamente os usuários.

### 6. Manutenibilidade
- **Modularidade**: Arquitetura modular para facilitar futuras atualizações.
- **Reusabilidade**: Componentes reutilizáveis para melhorias futuras.
- **Analisabilidade**: Código fácil de entender para rápida depuração.

### 7. Portabilidade
- **Adaptabilidade**: Funciona em diferentes dispositivos (iOS e Android).
- **Instalabilidade**: Fácil de instalar nos dispositivos móveis.
- **Substituibilidade**: Transição fácil do sistema manual para o digital.

### 8. Escalabilidade
- **Crescimento**: Sistema escalável para crescimento de funcionalidades e usuários.
- **Elasticidade**: Adaptar-se a variações de carga sem queda de desempenho.


