import { useEffect, useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { transactionService } from '../services/transactionService';

/**
 * Componente para listagem de transações
 * Exibe todas as transações cadastradas
 * 
 * Design: usei cores para diferenciar receitas (verde) e despesas (vermelho)
 * facilitando leitura visual rápida dos dados
 */
interface TransactionListProps {
  refreshTrigger: number;
}

export function TransactionList({ refreshTrigger }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Carrega a lista de transações do backend
   * Usa refreshTrigger para atualizar quando novas transações são criadas
   */
  const loadTransactions = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err: any) {
      setError('Erro ao carregar transações');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [refreshTrigger]);

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (transactions.length === 0) return <div className="empty">Nenhuma transação cadastrada</div>;

  return (
    <div className="list-container">
      <h2>Transações Cadastradas</h2>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <div className="transaction-info">
              <strong>{transaction.description}</strong>
              <span className={`transaction-type ${transaction.type === TransactionType.Income ? 'income' : 'expense'}`}>
                {transaction.type === TransactionType.Income ? 'Receita' : 'Despesa'}
              </span>
              <span className="transaction-value">
                R$ {transaction.value.toFixed(2)}
              </span>
              <span className="transaction-person">
                {transaction.personName || `Pessoa ID: ${transaction.personId}`}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
