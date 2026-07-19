import { useEffect, useState } from 'react';
import { GeneralTotals } from '../types';
import { totalsService } from '../services/totalsService';

/**
 * Componente para visualização de totais financeiros
 * Exibe totais por pessoa e totais gerais
 * 
 * Minha abordagem: tabela para dados por pessoa (mais estruturado)
 * e cards para totais gerais (mais destacado visualmente)
 * Saldo positivo em verde, negativo em vermelho para indicação rápida
 */
interface TotalsViewProps {
  refreshTrigger: number;
}

export function TotalsView({ refreshTrigger }: TotalsViewProps) {
  const [totals, setTotals] = useState<GeneralTotals | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Carrega os totais financeiros do backend
   * Cálculo é feito no back-end para garantir consistência
   */
  const loadTotals = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await totalsService.getTotals();
      setTotals(data);
    } catch (err: any) {
      setError('Erro ao carregar totais');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTotals();
  }, [refreshTrigger]);

  if (loading) return <div className="loading">Carregando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!totals) return <div className="empty">Nenhum dado disponível</div>;

  return (
    <div className="totals-container">
      <h2>Consulta de Totais</h2>
      
      {/* Totais por pessoa */}
      <div className="person-totals">
        <h3>Totais por Pessoa</h3>
        {totals.personTotalsList.length === 0 ? (
          <div className="empty">Nenhuma pessoa com transações</div>
        ) : (
          <table className="totals-table">
            <thead>
              <tr>
                <th>Pessoa</th>
                <th>Receitas</th>
                <th>Despesas</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {totals.personTotalsList.map((personTotal) => (
                <tr key={personTotal.id}>
                  <td>{personTotal.name}</td>
                  <td className="income">R$ {personTotal.totalIncome.toFixed(2)}</td>
                  <td className="expense">R$ {personTotal.totalExpense.toFixed(2)}</td>
                  <td className={`balance ${personTotal.balance >= 0 ? 'positive' : 'negative'}`}>
                    R$ {personTotal.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Totais gerais */}
      <div className="general-totals">
        <h3>Totais Gerais</h3>
        <div className="totals-summary">
          <div className="total-item">
            <span className="label">Total de Receitas:</span>
            <span className="value income">R$ {totals.totalIncome.toFixed(2)}</span>
          </div>
          <div className="total-item">
            <span className="label">Total de Despesas:</span>
            <span className="value expense">R$ {totals.totalExpense.toFixed(2)}</span>
          </div>
          <div className="total-item">
            <span className="label">Saldo Líquido:</span>
            <span className={`value balance ${totals.netBalance >= 0 ? 'positive' : 'negative'}`}>
              R$ {totals.netBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
