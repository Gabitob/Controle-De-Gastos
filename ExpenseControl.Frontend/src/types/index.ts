/**
 * Tipos de transação
 */
export enum TransactionType {
  Income = 1,    // Receita
  Expense = 2    // Despesa
}

/**
 * Interface representando uma pessoa
 */
export interface Person {
  id: number;
  name: string;
  age: number;
}

/**
 * Interface representando uma transação
 */
export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: TransactionType;
  personId: number;
  personName?: string; // Nome da pessoa (retornado pelo DTO)
}

/**
 * Interface representando os totais de uma pessoa
 */
export interface PersonTotals {
  id: number;
  name: string;
  totalIncome: number;
  totalExpense: number;
  balance: number; // Calculado: totalIncome - totalExpense
}

/**
 * Interface representando os totais gerais
 */
export interface GeneralTotals {
  personTotalsList: PersonTotals[];
  totalIncome: number;
  totalExpense: number;
  netBalance: number; // Calculado: totalIncome - totalExpense
}
