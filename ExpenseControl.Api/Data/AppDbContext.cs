using Microsoft.EntityFrameworkCore;
using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.Data;

/// <summary>
/// Contexto do banco de dados para o sistema de controle de gastos
/// Utiliza Entity Framework Core com SQLite para persistência de dados
/// 
/// Escolhi SQLite por ser leve, sem necessidade de servidor adicional
/// e perfeito para este tipo de aplicação
/// </summary>
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    /// <summary>
    /// DbSet para acesso às pessoas
    /// </summary>
    public DbSet<Person> Persons { get; set; }

    /// <summary>
    /// DbSet para acesso às transações
    /// </summary>
    public DbSet<Transaction> Transactions { get; set; }

    /// <summary>
    /// Configura o modelo do banco de dados
    /// Define relacionamentos e restrições
    /// 
/// Aqui configurei o cascade delete que é crucial para o requisito:
/// "Em casos que se delete uma pessoa, todas a transações dessa pessoa deverão ser apagadas"
    /// </summary>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurar relacionamento entre Person e Transaction
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.Person)
            .WithMany(p => p.Transactions)
            .HasForeignKey(t => t.PersonId)
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete: ao deletar pessoa, deleta suas transações
    }
}
