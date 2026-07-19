# Sistema de Controle de Gastos Residenciais
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1520892831298879551/1528518030701760563/13e43171-af11-47f7-8893-3c342ffba2f0.png?ex=6a5e96d9&is=6a5d4559&hm=6c52186e19eb7c11809097082e5bbecf060154729af46e669a6bf98864b03348" alt="Controle de gastos" width="320px">
</p> 
Sistema completo para gerenciamento de finanças pessoais, desenvolvido com .NET 10.0 (C#) para o back-end e React com TypeScript para o front-end.
 
## Funcionalidades
 
### Cadastro de Pessoas
- **Criação**: Adicionar novas pessoas com nome e idade
- **Listagem**: Visualizar todas as pessoas cadastradas
- **Exclusão**: Remover pessoas (todas as transações associadas são excluídas automaticamente - cascade delete)
- **Identificador**: Gerado automaticamente pelo banco de dados
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1520892831298879551/1528518030701760563/13e43171-af11-47f7-8893-3c342ffba2f0.png?ex=6a5e96d9&is=6a5d4559&hm=6c52186e19eb7c11809097082e5bbecf060154729af46e669a6bf98864b03348" alt="Cadastro Image" width="300px">
</p> 
 
### Cadastro de Transações
- **Criação**: Adicionar novas transações (receitas ou despesas)
- **Listagem**: Visualizar todas as transações cadastradas
- **Regra de Negócio**: Pessoas menores de 18 anos só podem cadastrar despesas
- **Identificador**: Gerado automaticamente pelo banco de dados
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1520892831298879551/1528517762350059560/4b8f0134-a201-4a12-ba9a-14454c9c5ccc.png?ex=6a5e9699&is=6a5d4519&hm=4bffa7139bd2340d0a2de3e81014c9a083a360866e925d81f9746025cf31bda4" alt="Transacao Image" width="300px">
</p> 
 
### Consulta de Totais
- **Totais por Pessoa**: Exibe receitas, despesas e saldo de cada pessoa
- **Totais Gerais**: Exibe o total de receitas, despesas e saldo líquido de todas as pessoas

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1520892831298879551/1528517604895887370/3e6dea61-e19e-46b0-9d6a-50c024120d6c.png?ex=6a5e9673&is=6a5d44f3&hm=7ce2263753c044e8bbfa27570ae7210cf713e1b9ccba3c092c2be85a2719ba0f" alt="Consulta Image" width="300px">
</p> 
 
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
