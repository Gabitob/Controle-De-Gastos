using Microsoft.EntityFrameworkCore;
using ExpenseControl.Api.Data;
using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.Repositories;

/// <summary>
/// Implementação do repositório de transações
/// Utiliza Entity Framework Core para acesso aos dados
/// Segue o mesmo padrão do PersonRepository para consistência
/// </summary>
public class TransactionRepository : ITransactionRepository
{
    private readonly AppDbContext _context;

    public TransactionRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Obtém todas as transações cadastradas no sistema
    /// Include carrega a pessoa relacionada (eager loading)
    /// </summary>
    public async Task<List<Transaction>> GetAllAsync()
    {
        return await _context.Transactions.Include(t => t.Person).ToListAsync();
    }

    /// <summary>
    /// Obtém todas as transações de uma pessoa específica
    /// Where filtra por PersonId para performance
    /// </summary>
    public async Task<List<Transaction>> GetByPersonIdAsync(int personId)
    {
        return await _context.Transactions
            .Where(t => t.PersonId == personId)
            .Include(t => t.Person)
            .ToListAsync();
    }

    /// <summary>
    /// Cria uma nova transação no sistema
    /// O identificador é gerado automaticamente pelo banco de dados
    /// Validações de negócio são feitas no controller, não aqui
    /// </summary>
    public async Task<Transaction> CreateAsync(Transaction transaction)
    {
        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();
        return transaction;
    }
}
