using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.Repositories;

/// <summary>
/// Interface para repositório de pessoas
/// Define operações CRUD para gerenciamento de pessoas
/// </summary>
public interface IPersonRepository
{
    /// <summary>
    /// Obtém todas as pessoas cadastradas
    /// </summary>
    Task<List<Person>> GetAllAsync();

    /// <summary>
    /// Obtém uma pessoa pelo seu identificador
    /// </summary>
    Task<Person?>	GetByIdAsync(int id);

    /// <summary>
    /// Cria uma nova pessoa
    /// </summary>
    Task<Person> CreateAsync(Person person);

    /// <summary>
    /// Remove uma pessoa pelo seu identificador
    /// Também remove todas as transações associadas (cascade delete)
    /// </summary>
    Task<bool> DeleteAsync(int id);
}
