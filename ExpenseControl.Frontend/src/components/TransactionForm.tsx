import { useState, useEffect } from 'react';
import { Transaction, TransactionType, Person } from '../types';
import { transactionService } from '../services/transactionService';
import { personService } from '../services/personService';

/**
 * Componente para formulário de cadastro de transações
 * Permite criar novas transações (receitas ou despesas)
 * Regra de negócio: Menores de 18 anos só podem cadastrar despesas
 * 
 * Fluxo implementado:
 * 1. Carrega pessoas ao montar (useEffect)
 * 2. Valida no front-end para dar feedback rápido
 * 3. Valida no back-end para segurança
 * 4. Mostra erro específico se menor tentar cadastrar receita
 */
interface TransactionFormProps {
  onTransactionCreated: () => void;
}

export function TransactionForm({ onTransactionCreated }: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.Expense);
  const [personId, setPersonId] = useState('');
  const [persons, setPersons] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPersons, setLoadingPersons] = useState(true);

  /**
   * Carrega a lista de pessoas para o select
   * Indica visualmente no select quem é menor de idade
   */
  const loadPersons = async () => {
    setLoadingPersons(true);
    try {
      const data = await personService.getAll();
      setPersons(data);
    } catch (err) {
      console.error('Erro ao carregar pessoas');
    } finally {
      setLoadingPersons(false);
    }
  };

  // Carregar pessoas ao montar o componente
  useEffect(() => {
    loadPersons();
  }, []);

  /**
   * Manipula o envio do formulário
   * Valida os dados e cria uma nova transação
   * 
 * Validações locais antes de enviar para economizar requisições
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (!description.trim()) {
      setError('A descrição é obrigatória');
      return;
    }

    if (!value || parseFloat(value) <= 0) {
      setError('O valor deve ser maior que zero');
      return;
    }

    if (!personId) {
      setError('Selecione uma pessoa');
      return;
    }

    setLoading(true);

    try {
      await transactionService.create({
        description: description.trim(),
        value: parseFloat(value),
        type,
        personId: parseInt(personId),
      });

      // Limpar formulário e notificar sucesso
      setDescription('');
      setValue('');
      onTransactionCreated();
    } catch (err: any) {
      setError(err.response?.data || 'Erro ao criar transação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Transação</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Valor:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min="0.01"
            step="0.01"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(parseInt(e.target.value) as TransactionType)}
            disabled={loading}
          >
            <option value={TransactionType.Income}>Receita</option>
            <option value={TransactionType.Expense}>Despesa</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="person">Pessoa:</label>
          <select
            id="person"
            value={personId}
            onChange={(e) => setPersonId(e.target.value)}
            disabled={loading || loadingPersons}
          >
            <option value="">Selecione uma pessoa</option>
            {persons.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name} ({person.age} anos)
                {person.age < 18 && ' - Menor de idade (apenas despesas)'}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading || loadingPersons}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
//Foi difícil, mas fiz meu melhor kkkk