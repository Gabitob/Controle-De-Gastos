import { useState } from 'react';
import { PersonForm } from './components/PersonForm';
import { PersonList } from './components/PersonList';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { TotalsView } from './components/TotalsView';
import './App.css';

/**
 * Componente principal da aplicação
 * Gerencia a navegação entre as diferentes funcionalidades do sistema
 * 
 * Arquitetura:
 * - Navegação por abas para separar responsabilidades
 * - refreshTrigger força atualização após operações CRUD
 * - Cada aba é independente e carrega seus próprios dados
 * - Estado local simples, sem necessidade de Redux ou similar
 */
function App() {
  const [activeTab, setActiveTab] = useState<'persons' | 'transactions' | 'totals'>('persons');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  /**
   * Força a atualização das listas após operações de CRUD
   * Essa foi minha solução simples para sincronizar componentes
   * sem usar um gerenciador de estado complexo
   */
  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Controle de Gastos Residenciais</h1>
        <p>Sistema para gerenciamento de finanças pessoais</p>
      </header>

      <nav className="app-nav">
        <button
          className={activeTab === 'persons' ? 'active' : ''}
          onClick={() => setActiveTab('persons')}
        >
          Pessoas
        </button>
        <button
          className={activeTab === 'transactions' ? 'active' : ''}
          onClick={() => setActiveTab('transactions')}
        >
          Transações
        </button>
        <button
          className={activeTab === 'totals' ? 'active' : ''}
          onClick={() => setActiveTab('totals')}
        >
          Totais
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'persons' && (
          <div className="tab-content">
            <PersonForm onPersonCreated={triggerRefresh} />
            <PersonList
              onPersonDeleted={triggerRefresh}
              refreshTrigger={refreshTrigger}
            />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="tab-content">
            <TransactionForm onTransactionCreated={triggerRefresh} />
            <TransactionList refreshTrigger={refreshTrigger} />
          </div>
        )}

        {activeTab === 'totals' && (
          <div className="tab-content">
            <TotalsView refreshTrigger={refreshTrigger} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
