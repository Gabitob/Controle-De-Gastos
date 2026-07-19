import { useState } from 'react';
import { Person } from '../types';
import { personService } from '../services/personService';

/**
 * Componente para formulário de cadastro de pessoas
 * Permite criar novas pessoas com nome e idade
 * 
 * Minha implementação:
 * - Validações no front-end para feedback imediato ao usuário
 * - Limpeza do formulário após sucesso para melhor UX
 * - Tratamento de erros com mensagens claras
 */
interface PersonFormProps {
  onPersonCreated: () => void;
}

export function PersonForm({ onPersonCreated }: PersonFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Manipula o envio do formulário
   * Valida os dados e cria uma nova pessoa
   * 
 * Fluxo: valida localmente -> envia para API -> limpa formulário -> notifica sucesso
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (!name.trim()) {
      setError('O nome é obrigatório');
      return;
    }

    if (!age || parseInt(age) <= 0) {
      setError('A idade deve ser maior que zero');
      return;
    }

    setLoading(true);

    try {
      await personService.create({
        name: name.trim(),
        age: parseInt(age),
      });

      // Limpar formulário e notificar sucesso
      setName('');
      setAge('');
      onPersonCreated();
    } catch (err: any) {
      setError(err.response?.data || 'Erro ao criar pessoa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Pessoa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Idade:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            disabled={loading}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
