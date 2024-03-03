const transactionUtilService = require("./transactionUtilService")
const transactionRepository = require("../repository/transaction")
const logger = require("../../../logging/logger")
const dotenv = require('dotenv')

dotenv.config()

const addTransaction = async ( transactionData )=>{
    transactionData.operation = process.env.CREATE_OPERATION
    let updatedTransactionData
    try{
        updatedTransactionData =  await transactionUtilService.validateAndGetUpdatedData(transactionData)
    }catch(e){
        logger.error("Unable to add transaction. Invalid Data provided")
        throw new Error(e.message)
    }
    return transactionRepository.addTransactionRecord( updatedTransactionData )
}

const getAllTransaction = async ( query  ) => {
    const updatedQuery = await transactionUtilService.getTransactionQuery( query )
    return transactionRepository.getTransactions( updatedQuery )
}

const updateTransactionDetails = async( id , updatedData )=>{
    let updatedTransactionData
    try{
        updatedTransactionData = await transactionUtilService.validateAndGetUpdatedData(updatedData)
    }catch(e){
        logger.error("Unable to update transaction. Invalid Data provided")
        throw new Error("Unable to update transaction. Invalid Data provided")
    }
    return transactionRepository.updateTransaction( id , updatedTransactionData )
}

const deleteTransactionById = async ( id ) => {
    return transactionRepository.deleteTransaction( id );
}

module.exports =  {
    addTransaction,
    updateTransactionDetails,
    getAllTransaction,
    deleteTransactionById
}