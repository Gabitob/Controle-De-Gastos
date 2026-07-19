# Sistema de Controle de Gastos Residenciais
 
Sistema completo para gerenciamento de finanças pessoais, desenvolvido com .NET 10.0 (C#) para o back-end e React com TypeScript para o front-end.
 
## Funcionalidades
 
### Cadastro de Pessoas
- **Criação**: Adicionar novas pessoas com nome e idade
- **Listagem**: Visualizar todas as pessoas cadastradas
- **Exclusão**: Remover pessoas (todas as transações associadas são excluídas automaticamente - cascade delete)
- **Identificador**: Gerado automaticamente pelo banco de dados
 
### Cadastro de Transações
- **Criação**: Adicionar novas transações (receitas ou despesas)
- **Listagem**: Visualizar todas as transações cadastradas
- **Regra de Negócio**: Pessoas menores de 18 anos só podem cadastrar despesas
- **Identificador**: Gerado automaticamente pelo banco de dados
 
### Consulta de Totais
- **Totais por Pessoa**: Exibe receitas, despesas e saldo de cada pessoa
- **Totais Gerais**: Exibe o total de receitas, despesas e saldo líquido de todas as pessoas
 
## Tecnologias
 
### Back-end
- **.NET 10.0** com C#
- **Entity Framework Core** para ORM
- **SQLite** para persistência de dados
- **ASP.NET Core Web API** para endpoints REST
 
### Front-end
- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Axios** para chamadas de API
 
## Como Executar
 
### Pré-requisitos
- .NET 10.0 SDK
- Node.js 18+ e npm


# Comandos

## Back-end
 
- **cd ExpenseControl.Api**
- **dotnet restore**
- **dotnet run**
- **A API estará em http://localhost:5000**


## Front-end
- **cd ExpenseControl.Frontend**
- **npm install**
- **npm run dev**
- **A aplicação estará em http://localhost:5173**
