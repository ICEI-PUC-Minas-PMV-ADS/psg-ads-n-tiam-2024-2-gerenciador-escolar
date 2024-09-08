# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

- Maria tem 45 anos, é professora de matemática no Instituto Educacional Copacabana. Tem como objetivo simplificar o lançamento de notas e reduzir o tempo gasto em tarefas administrativas. E tem como frustação a perda de tempo com o registro manual de notas em planilhas de papel, que é suscetível a erros. 

- José tem 38 anos, é empresário e pai da Amanda, aluna do Instituto Educacional Copacabana. Tem como objetivo acompanhar as notas e desempenho da filha de forma efetiva e remota. E tem como frustação a locomoção até a escola para pegar o boletim dos trimestres, tornando-se inviável devido à rotina agitada.

- Elizabet tem 38 anos, é diretora do Instituto Educacional Copacabana, Tem como objetivo garantir que os registros escolares sejam precisos, seguros e acessíveis. E tem como frustação a dificuldade em consolidar dados manualmente e o risco de perda de documentos importantes. 

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Professor  | Registrar as notas e presença dos alunos de forma rápida e eficiente           | Focar em tarefas relacionadas ao ensino e não administrativas                |
|Responsável do aluno       | Quero poder acessar o desempenho escolar do aluno que sou responsável              | acompanhar seus resultados durante o período escolar |
|Diretora       | Gerar relatórios trimestrais automaticamente              | Facilitar a comunicação com os pais e responsáveis e reduzir o tempo gasto em tarefas administrativas |

## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve permitir o cadastro de usuários, incluindo alunos, professores e a diretora.(Cada tipo de usuário deve ter permissões específicas). | ALTA | 
|RF-002| O sistema deve permitir que os usuários façam login usando e-mail e senha. | ALTA |
|RF-003| O sistema deve permitir que os professores adicionem, editem e excluam notas dos alunos para diferentes disciplinas.(Deve haver a possibilidade de adicionar comentários às notas). | ALTA | 
|RF-004| O sistema deve permitir que os professores registrem a presença ou ausência dos alunos em cada aula.(Deve haver uma funcionalidade para justificar ausências). | ALTA |
|RF-005| Alunos devem poder visualizar suas notas e seu histórico de presença. | ALTA | 
|RF-006| Professores devem poder visualizar a lista de alunos e seus respectivos status de presença e desempenho. | ALTA |
|RF-007| O sistema deve permitir que a diretora crie, edite e exclua turmas e disciplinas. | ALTA | 
|RF-008| O sistema deve permitir a exportação de dados de notas e presença em formatos como PDF. | BAIXO |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Usabilidade:A interface do usuário deve ser intuitiva e fácil de usar para todos os tipos de usuários. | ALTA | 
|RNF-002| Segurança:Todas as informações sensíveis, como senhas e dados pessoais,devem ser armazenadas de forma segura. | ALTA |
|RNF-003| Portabilidade:O sistema deve ser acessível via aplicativo móvel (iOS e Android).Deve haver compatibilidade com as versões mais recentes dos sistemas operacionais. | ALTA | 
|RNF-004| Confiabilidade:O sistema deve garantir disponibilidade mínima de 95%. | ALTA | 
|RNF-005| Desempenho:O sistema deve ser capaz de suportar até 5.000 usuários simultâneos sem queda de desempenho. | MÉDIA | 
|RNF-006| Desempenho:A resposta ao usuário (tempo de carregamento) deve ser menor a 5 segundos para ações comuns (login, visualização de notas, etc.). | MÉDIA | 
|RNF-007| Escalabilidade:O sistema deve ser escalável para adicionar novas funcionalidades sem precisar de grandes revisões estruturais. | MÉDIA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O sistema deve ser entregue até a data final de entrega do semestre. |
|02| Todos os membros do grupo devem participar ativamente do desenvolvimento. |
|03| Os envios de artefatos devem ser feitos no GitHub. |

## Diagrama de Casos de Uso

![Exemplo de matriz de rastreabilidade](img/Diagrama-de-caso-de-uso-de-T.I-Mobile.png)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
