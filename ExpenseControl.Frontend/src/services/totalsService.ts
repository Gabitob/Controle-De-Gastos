import api from './api';
import { GeneralTotals } from '../types';

/**
 * Serviço para consulta de totais financeiros
 * Fornece métodos para obter totais por pessoa e totais gerais
 * 
 * Simples e direto, pois toda a lógica de cálculo está no back-end
 */
export const totalsService = {
  /**
   * Obtém os totais financeiros de todas as pessoas
   * Retorna lista com totais por pessoa e totais gerais
   */
  async getTotals(): Promise<GeneralTotals> {
    const response = await api.get<GeneralTotals>('/totals');
    return response.data;
  },
};
