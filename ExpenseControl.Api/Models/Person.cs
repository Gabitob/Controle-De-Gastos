namespace ExpenseControl.Api.Models;

/// <summary>
/// Representa uma pessoa no sistema de controle de gastos
/// </summary>
public class Person
{
    /// <summary>
    /// Identificador único da pessoa (gerado automaticamente)
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Nome da pessoa
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Idade da pessoa
    /// </summary>
    public int Age { get; set; }

    /// <summary>
    /// Lista de transações associadas a esta pessoa
    /// </summary>
    public List<Transaction> Transactions { get; set; } = new();
}
