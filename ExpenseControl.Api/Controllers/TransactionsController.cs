using Microsoft.AspNetCore.Mvc;
using ExpenseControl.Api.Models;
using ExpenseControl.Api.Repositories;

namespace ExpenseControl.Api.Controllers;

/// <summary>
/// Controller para gerenciamento de transações
/// 
/// Decisões de implementação:
/// - Não implementei edição/deleção conforme especificação
/// - Validação de idade é crítica: menores só podem cadastrar despesas
/// - Retorno DTO para evitar ciclos de serialização JSON
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IPersonRepository _personRepository;

    public TransactionsController(
        ITransactionRepository transactionRepository,
        IPersonRepository personRepository)
    {
        _transactionRepository = transactionRepository;
        _personRepository = personRepository;
    }

    /// <summary>
    /// Obtém todas as transações cadastradas
    /// GET: api/transactions
    /// Retorno DTO simplificado para evitar problemas de serialização circular
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<object>>> GetAll()
    {
        var transactions = await _transactionRepository.GetAllAsync();
        
        // Retorna DTO sem a propriedade de navegação para evitar problemas de serialização
        var result = transactions.Select(t => new {
            t.Id,
            t.Description,
            t.Value,
            t.Type,
            t.PersonId,
            PersonName = t.Person?.Name
        }).ToList();
        
        return Ok(result);
    }

    /// <summary>
    /// Obtém todas as transações de uma pessoa específica
    /// GET: api/transactions/person/{personId}
    /// Útil para filtrar transações por pessoa em views específicas
    /// </summary>
    [HttpGet("person/{personId}")]
    public async Task<ActionResult<List<Transaction>>> GetByPersonId(int personId)
    {
        var transactions = await _transactionRepository.GetByPersonIdAsync(personId);
        return Ok(transactions);
    }

    /// <summary>
    /// Cria uma nova transação
    /// POST: api/transactions
    /// Regra de negócio: Se a pessoa for menor de 18 anos, apenas despesas podem ser cadastradas
    /// Validação de idade é feita aqui para garantir segurança mesmo que front-end falhe
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<object>> Create([FromBody] Transaction transaction)
    {
        // Validação básica
        if (string.IsNullOrWhiteSpace(transaction.Description))
            return BadRequest("A descrição da transação é obrigatória.");
        
        if (transaction.Value <= 0)
            return BadRequest("O valor da transação deve ser maior que zero.");

        // Verificar se a pessoa existe
        var person = await _personRepository.GetByIdAsync(transaction.PersonId);
        if (person == null)
            return BadRequest($"Pessoa com ID {transaction.PersonId} não encontrada.");

        // Regra de negócio: Menores de idade só podem cadastrar despesas
        if (person.Age < 18 && transaction.Type == TransactionType.Income)
            return BadRequest("Pessoas menores de 18 anos só podem cadastrar despesas.");

        var createdTransaction = await _transactionRepository.CreateAsync(transaction);
        
        // Retorna DTO sem a propriedade de navegação para evitar problemas de serialização
        var result = new {
            createdTransaction.Id,
            createdTransaction.Description,
            createdTransaction.Value,
            createdTransaction.Type,
            createdTransaction.PersonId,
            PersonName = person.Name
        };
        
        return CreatedAtAction(nameof(GetAll), new { id = createdTransaction.Id }, result);
    }
}
