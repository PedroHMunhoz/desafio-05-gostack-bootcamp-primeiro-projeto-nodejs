import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

// Interface criada para montagem do objeto que retornará o array de
// Transactions e o objeto Balance juntos
interface Total {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Total {
    const ret = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return ret;
  }

  // Esse método retorna o objeto Balance com os seus respectivos valores calculados
  public getBalance(): Balance {
    // Cálculo do totalizador, conforme os valores passados
    const calculateTotal = (
      amount: number,
      { value: currentValue }: Transaction,
    ): number => {
      return amount + currentValue;
    };

    // Para calcular o Income e Outcome, é feito um filter no array e
    // com ele filtrado, usando o reduce é efetuado o calculo.
    // O Reduce aqui recebe como parâmetro a função calculateTotal que itera
    // os dados do array filtrado

    // Calculo de Entradas
    const income = this.transactions
      .filter(item => item.type === 'income')
      .reduce(calculateTotal, 0);

    // Calculo de Saídas
    const outcome = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce(calculateTotal, 0);

    // Aqui calculo o total de Entradas - Saídas
    const total = income - outcome;

    // Retorna um objeto montado com os dados calculados
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
