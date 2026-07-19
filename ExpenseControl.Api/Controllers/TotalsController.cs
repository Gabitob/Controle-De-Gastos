using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseControl.Api.Data;
using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.Controllers;

/// <summary>
/// Controller para consulta de totais financeiros
/// Fornece endpoint para consulta de totais por pessoa e totais gerais
/// 
/// Minha abordagem: cálculo é feito no back-end para garantir consistência
/// e reduzir carga de processamento no front-end
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TotalsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TotalsController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Obtém os totais financeiros de todas as pessoas
    /// GET: api/totals
    /// Retorna lista com totais por pessoa e totais gerais
    /// Usei LINQ para cálculos agregados, eficiente e legível
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<GeneralTotals>> GetTotals()
    {
        // Buscar todas as pessoas com suas transações
        var persons = await _context.Persons
            .Include(p => p.Transactions)
            .ToListAsync();

        var personTotalsList = new List<PersonTotals>();
        decimal totalIncome = 0;
        decimal totalExpense = 0;

        // Calcular totais para cada pessoa
        foreach (var person in persons)
        {
            var personIncome = person.Transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Value);

            var personExpense = person.Transactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Value);

            personTotalsList.Add(new PersonTotals
            {
                Id = person.Id,
                Name = person.Name,
                TotalIncome = personIncome,
                TotalExpense = personExpense
            });

            totalIncome += personIncome;
            totalExpense += personExpense;
        }

        var generalTotals = new GeneralTotals
        {
            PersonTotalsList = personTotalsList,
            TotalIncome = totalIncome,
            TotalExpense = totalExpense
        };

        return Ok(generalTotals);
    }
}
