import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // Chama o método All do repository, que irá retornar o objeto com os dados
    const transactions = transactionsRepository.all();

    // Devolve a resposta
    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // Desestrutura os dados vindo do body
    const { title, value, type } = request.body;

    // Instancia o novo objeto do service, passando o objeto repository
    // no construtor
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // Chama o método de execute, que é responsável por criar a transaction
    const transaction = createTransaction.execute({ title, value, type });

    // Devolve a resposta da requisição
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
