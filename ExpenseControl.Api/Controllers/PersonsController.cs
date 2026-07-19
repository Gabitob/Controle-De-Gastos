using Microsoft.AspNetCore.Mvc;
using ExpenseControl.Api.Models;
using ExpenseControl.Api.Repositories;

namespace ExpenseControl.Api.Controllers;

/// <summary>
/// Controller para gerenciamento de pessoas
/// Implementei CRUD completo pois pessoas são a base do sistema
/// Ao deletar uma pessoa, uso cascade delete para manter integridade referencial
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PersonsController : ControllerBase
{
    private readonly IPersonRepository _personRepository;

    public PersonsController(IPersonRepository personRepository)
    {
        _personRepository = personRepository;
    }

    /// <summary>
    /// Obtém todas as pessoas cadastradas
    /// GET: api/persons
    /// Usei GetAllAsync para buscar todas sem filtros, simples e direto
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<Person>>> GetAll()
    {
        var persons = await _personRepository.GetAllAsync();
        return Ok(persons);
    }

    /// <summary>
    /// Obtém uma pessoa específica pelo seu identificador
    /// GET: api/persons/{id}
    /// Retorna 404 se não encontrado para tratamento adequado no front-end
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Person>> GetById(int id)
    {
        var person = await _personRepository.GetByIdAsync(id);
        if (person == null)
            return NotFound($"Pessoa com ID {id} não encontrada.");
        return Ok(person);
    }

    /// <summary>
    /// Cria uma nova pessoa
    /// POST: api/persons
    /// Validações básicas no controller antes de salvar no banco
    /// ID é gerado automaticamente pelo SQLite
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Person>> Create([FromBody] Person person)
    {
        // Validação básica
        if (string.IsNullOrWhiteSpace(person.Name))
            return BadRequest("O nome da pessoa é obrigatório.");
        
        if (person.Age <= 0)
            return BadRequest("A idade deve ser maior que zero.");

        var createdPerson = await _personRepository.CreateAsync(person);
        return CreatedAtAction(nameof(GetById), new { id = createdPerson.Id }, createdPerson);
    }

    /// <summary>
    /// Remove uma pessoa pelo seu identificador
    /// DELETE: api/persons/{id}
    /// Todas as transações associadas também serão removidas (cascade delete)
    /// Essa foi uma decisão importante para manter consistência dos dados
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var deleted = await _personRepository.DeleteAsync(id);
        if (!deleted)
            return NotFound($"Pessoa com ID {id} não encontrada.");
        
        return NoContent();
    }
}
