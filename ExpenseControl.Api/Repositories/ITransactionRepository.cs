using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.Repositories;

/// <summary>
/// Interface para repositório de transações
/// Define operações de criação e listagem de transações
/// </summary>
public interface ITransactionRepository
{
    /// <summary>
    /// Obtém todas as transações cadastradas
    /// </summary>
    Task<List<Transaction>> GetAllAsync();

    /// <summary>
    /// Obtém todas as transações de uma pessoa específica
    /// </summary>
    Task<List<Transaction>> GetByPersonIdAsync(int personId);

    /// <summary>
    /// Cria uma nova transação
    /// Valida se a pessoa existe e se a regra de idade é respeitada
    /// </summary>
    Task<Transaction> CreateAsync(Transaction transaction);
}
