namespace ExpenseControl.Api.Models;

/// <summary>
/// DTO que representa os totais financeiros de uma pessoa
/// </summary>
public class PersonTotals
{
    /// <summary>
    /// Identificador da pessoa
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Nome da pessoa
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Total de receitas da pessoa
    /// </summary>
    public decimal TotalIncome { get; set; }

    /// <summary>
    /// Total de despesas da pessoa
    /// </summary>
    public decimal TotalExpense { get; set; }

    /// <summary>
    /// Saldo líquido (receitas - despesas)
    /// </summary>
    public decimal Balance => TotalIncome - TotalExpense;
}

/// <summary>
/// DTO que representa os totais gerais de todas as pessoas
/// </summary>
public class GeneralTotals
{
    /// <summary>
    /// Lista de totais por pessoa
    /// </summary>
    public List<PersonTotals> PersonTotalsList { get; set; } = new();

    /// <summary>
    /// Total geral de receitas
    /// </summary>
    public decimal TotalIncome { get; set; }

    /// <summary>
    /// Total geral de despesas
    /// </summary>
    public decimal TotalExpense { get; set; }

    /// <summary>
    /// Saldo líquido geral
    /// </summary>
    public decimal NetBalance => TotalIncome - TotalExpense;
}
