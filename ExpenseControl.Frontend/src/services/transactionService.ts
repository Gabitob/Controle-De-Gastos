import api from './api';
import { Transaction, TransactionType } from '../types';

/**
 * Serviço para gerenciamento de transações
 * Fornece métodos para interagir com a API de transações
 * 
 * Segue o mesmo padrão do personService para consistência
 * Validação de regra de negócio é feita no back-end
 */
export const transactionService = {
  /**
   * Obtém todas as transações cadastradas
   */
  async getAll(): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
  },

  /**
   * Obtém todas as transações de uma pessoa específica
   */
  async getByPersonId(personId: number): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>(`/transactions/person/${personId}`);
    return response.data;
  },

  /**
   * Cria uma nova transação
   * Regra de negócio: Se a pessoa for menor de 18 anos, apenas despesas podem ser cadastradas
   */
  async create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const response = await api.post<Transaction>('/transactions', transaction);
    return response.data;
  },
};
