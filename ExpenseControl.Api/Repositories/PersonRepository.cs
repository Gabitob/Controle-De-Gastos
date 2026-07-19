using Microsoft.EntityFrameworkCore;
using ExpenseControl.Api.Data;
using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.Repositories;

/// <summary>
/// Implementação do repositório de pessoas usando padrão Repository
/// Separei a lógica de acesso a dados para facilitar testes e manutenção
/// O cascade delete é configurado no DbContext, não aqui
/// </summary>
public class PersonRepository : IPersonRepository
{
    private readonly AppDbContext _context;

    public PersonRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Obtém todas as pessoas cadastradas no sistema
    /// ToListAsync é usado para execução assíncrona e melhor performance
    /// </summary>
    public async Task<List<Person>> GetAllAsync()
    {
        return await _context.Persons.ToListAsync();
    }

    /// <summary>
    /// Obtém uma pessoa específica pelo seu identificador
    /// FindAsync é otimizado para busca por chave primária
    /// </summary>
    public async Task<Person?> GetByIdAsync(int id)
    {
        return await _context.Persons.FindAsync(id);
    }

    /// <summary>
    /// Cria uma nova pessoa no sistema
    /// O identificador é gerado automaticamente pelo banco de dados
    /// SaveChangesAsync confirma a transação no banco
    /// </summary>
    public async Task<Person> CreateAsync(Person person)
    {
        _context.Persons.Add(person);
        await _context.SaveChangesAsync();
        return person;
    }

    /// <summary>
    /// Remove uma pessoa do sistema
    /// Devido à configuração de cascade delete, todas as transações
    /// associadas a esta pessoa também serão removidas automaticamente
    /// Essa configuração foi feita no OnModelCreating do DbContext
    /// </summary>
    public async Task<bool> DeleteAsync(int id)
    {
        var person = await _context.Persons.FindAsync(id);
        if (person == null)
            return false;

        _context.Persons.Remove(person);
        await _context.SaveChangesAsync();
        return true;
    }
}
