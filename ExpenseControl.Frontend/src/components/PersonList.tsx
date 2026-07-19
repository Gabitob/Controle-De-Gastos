import { useEffect, useState } from 'react';
import { Person } from '../types';
import { personService } from '../services/personService';

/**
 * Componente para listagem de pessoas
 * Exibe todas as pessoas cadastradas com opção de exclusão
 * 
 * Decisão de UX: Confirmação antes de deletar para evitar acidentes
 * pois cascade delete apaga todas as transações da pessoa
 */
interface PersonListProps {
  onPersonDeleted: () => void;
  refreshTrigger: number;
}

export function PersonList({ onPersonDeleted, refreshTrigger }: PersonListProps) {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Carrega a lista de pessoas do backend
   * Usa refreshTrigger para recarregar quando há mudanças externas
   */
  const loadPersons = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await personService.getAll();
      setPersons(data);
    } catch (err: any) {
      setError('Erro ao carregar pessoas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPersons();
  }, [refreshTrigger]);

  /**
   * Remove uma pessoa pelo ID
   * Ao remover uma pessoa, todas as suas transações também são removidas (cascade delete)
 * Por isso adicionei confirmação via window.confirm
   */
  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Deseja realmente remover ${name} e todas as suas transações?`)) {
      return;
    }

    try {
      await personService.delete(id);
      onPersonDeleted();
    } catch (err: any) {
      alert('Erro ao remover pessoa');
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (persons.length === 0) return <div className="empty">Nenhuma pessoa cadastrada</div>;

  return (
    <div className="list-container">
      <h2>Pessoas Cadastradas</h2>
      <ul className="person-list">
        {persons.map((person) => (
          <li key={person.id} className="person-item">
            <div className="person-info">
              <strong>{person.name}</strong>
              <span>{person.age} anos</span>
            </div>
            <button
              onClick={() => handleDelete(person.id, person.name)}
              className="delete-btn"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
