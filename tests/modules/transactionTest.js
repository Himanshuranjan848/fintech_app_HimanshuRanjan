const transactionService = require('./../../modules/transaction/service/transactionService');
const transactionUtilService = require('./../../modules/transaction/service/transactionUtilService');
const transactionRepository = require('./../../modules/transaction/repository/transaction');
const logger = require('./../../logging/logger');


jest.mock('./../../modules/transaction/service/transactionUtilService');
const mockTransactionUtilService = require('./../../modules/transaction/service/transactionUtilService');


jest.mock('./../../modules/transaction/repository/transaction');
const mockTransactionRepository = require('./../../modules/transaction/repository/transaction');


jest.mock('./../../logging/logger');
const mockLogger = require('./../../logging/logger');
const { ObjectId } = require('mongodb');

describe('Transaction Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a transaction', async () => {
    const mockTransactionData = { 
      sender: "himanshu@example.com",
      receiver: "himanshu2@example.com",
      amount: 100,
      expenseType: 'Groceries',
      status: 'pending'
     };
    const mockUpdatedTransactionData = {
        sender: "65e32d17aead2dbbab5eda6e",
        receiver: "65e32c570299bb2dc95b9e62",
        amount: 100,
        expenseType: 'Groceries',
        status: 'pending',
        transactionDate: '2024-03-03',
        recordStatus: true,
     };
    
    mockTransactionUtilService.validateAndGetUpdatedData.mockReturnValue(mockUpdatedTransactionData);
    mockTransactionRepository.addTransactionRecord.mockResolvedValue(mockUpdatedTransactionData);

    const result = await transactionService.addTransaction(mockTransactionData);

    expect(mockTransactionUtilService.validateAndGetUpdatedData).toHaveBeenCalledWith(mockTransactionData);
    expect(mockTransactionRepository.addTransactionRecord).toHaveBeenCalledWith(mockUpdatedTransactionData);
    expect(result).toEqual(mockUpdatedTransactionData);
  });

  it('should handle invalid data when adding a transaction', async () => {
    const mockTransactionData = { 
        sender: "himanshu@example.com",
        receiver: "himanshu2@example.com",
        amount: "100",
        expenseType: 'Groceries',
        status: 'pending'
     };

    mockTransactionUtilService.validateAndGetUpdatedData.mockImplementation(() => {
      throw new Error('Unable to add transaction. Invalid Data provided');
    });

    await expect(transactionService.addTransaction(mockTransactionData)).rejects.toThrowError('Unable to add transaction. Invalid Data provided');

    expect(mockLogger.error).toHaveBeenCalledWith('Unable to add transaction. Invalid Data provided');
  });

  it('should get all transactions', async () => {
    const mockQuery = { 
        "transactionType" : "spend" , 
        "expenseType" : "Untitled"
     };
    const mockUpdatedQuery = { 
        "transactionType" : "spend" , 
        "expenseType" : "Untitled"
     };
    const mockTransactions = [{
        "sender": "65e32bf1494d9c69016638c5",
        "receiver": "65e32d17aead2dbbab5eda6e",
        "amount": 100,
        "expenseType": "Untitled",
        "status": "pending",
        "transactionDate": "2024-03-02T18:30:00.000Z",
        "recordStatus": true,
        "_id": "65e4315a11445479fc922811",
        "__v": 0
    }];

    mockTransactionUtilService.getTransactionQuery.mockReturnValue(mockUpdatedQuery);
    mockTransactionRepository.getTransactions.mockResolvedValue(mockTransactions);

    const result = await transactionService.getAllTransaction(mockQuery);

    expect(mockTransactionUtilService.getTransactionQuery).toHaveBeenCalledWith(mockQuery);
    expect(mockTransactionRepository.getTransactions).toHaveBeenCalledWith(mockUpdatedQuery);
    expect(result).toEqual(mockTransactions);
  });

  it('should update transaction details', async () => {
    const mockId = '65e32c7f0299bb2dc95b9e65';
    const mockUpdatedData = {
        expenseType: 'Personal'
     };
    const mockUpdatedTransactionData = {
        expenseType: 'Personal'
     };

    mockTransactionUtilService.validateAndGetUpdatedData.mockReturnValue(mockUpdatedTransactionData);
    mockTransactionRepository.updateTransaction.mockResolvedValue(mockUpdatedTransactionData);

    const result = await transactionService.updateTransactionDetails(mockId, mockUpdatedData);

    expect(mockTransactionUtilService.validateAndGetUpdatedData).toHaveBeenCalledWith(mockUpdatedData);
    expect(mockTransactionRepository.updateTransaction).toHaveBeenCalledWith(mockId, mockUpdatedTransactionData);
    expect(result).toEqual(mockUpdatedTransactionData);
  });

  it('should handle invalid data when updating Transaction details', async () => {
    const mockId = '65e32c7f0299bb2dc95b9e65';
    const mockUpdatedData = { 
        status : "done"
    };

    mockTransactionUtilService.validateAndGetUpdatedData.mockImplementation(() => {
      throw new Error('Unable to update transaction. Invalid Data provided');
    });

    await expect(transactionService.updateTransactionDetails(mockId, mockUpdatedData)).rejects.toThrowError('Unable to update transaction. Invalid Data provided');

    expect(mockLogger.error).toHaveBeenCalledWith('Unable to update transaction. Invalid Data provided');
  });

  it('should delete a transaction by ID', async () => {
    const mockId = '65e32c7f0299bb2dc95b9e65';

    mockTransactionRepository.deleteTransaction.mockResolvedValue(true);

    const result = await transactionService.deleteTransactionById(mockId);

    expect(mockTransactionRepository.deleteTransaction).toHaveBeenCalledWith(mockId);
    expect(result).toEqual(true);
  });
});
