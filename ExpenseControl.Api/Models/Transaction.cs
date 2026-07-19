namespace ExpenseControl.Api.Models;

/// <summary>
/// Representa uma transação financeira (receita ou despesa)
/// </summary>
public class Transaction
{
    /// <summary>
    /// Identificador único da transação (gerado automaticamente)
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Descrição da transação
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Valor da transação
    /// </summary>
    public decimal Value { get; set; }

    /// <summary>
    /// Tipo da transação (Receita ou Despesa)
    /// </summary>
    public TransactionType Type { get; set; }

    /// <summary>
    /// Identificador da pessoa associada à transação
    /// </summary>
    public int PersonId { get; set; }

    /// <summary>
    /// Navegação para a pessoa associada
    /// </summary>
    public Person? Person { get; set; }
}

/// <summary>
/// Enumeração que define os tipos possíveis de transação
/// </summary>
public enum TransactionType
{
    /// <summary>
    /// Receita - entrada de dinheiro
    /// </summary>
    Income = 1,

    /// <summary>
    /// Despesa - saída de dinheiro
    /// </summary>
    Expense = 2
}
