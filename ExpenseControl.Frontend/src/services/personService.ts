import api from './api';
import { Person } from '../types';

/**
 * Serviço para gerenciamento de pessoas
 * Fornece métodos para interagir com a API de pessoas
 * 
 * Centralizei as chamadas de API aqui para facilitar manutenção
 * e reutilização em diferentes componentes
 */
export const personService = {
  /**
   * Obtém todas as pessoas cadastradas
   */
  async getAll(): Promise<Person[]> {
    const response = await api.get<Person[]>('/persons');
    return response.data;
  },

  /**
   * Obtém uma pessoa específica pelo ID
   */
  async getById(id: number): Promise<Person> {
    const response = await api.get<Person>(`/persons/${id}`);
    return response.data;
  },

  /**
   * Cria uma nova pessoa
   */
  async create(person: Omit<Person, 'id'>): Promise<Person> {
    const response = await api.post<Person>('/persons', person);
    return response.data;
  },

  /**
   * Remove uma pessoa pelo ID
   * Também remove todas as transações associadas (cascade delete)
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/persons/${id}`);
  },
};
