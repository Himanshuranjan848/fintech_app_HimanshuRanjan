const { ObjectId } = require("mongodb");
const { MongoDBConnection } = require("../../../mongoDB")
const mongoose = require('mongoose');
const logger = require("./../../../logging/logger")


const transactionSchema = new mongoose.Schema({
    sender: {
        type : ObjectId,
        required: true
    },
    receiver : {
        type : ObjectId,
        required : true
    } , 
    amount: {
        type: Number
    },
    expenseType : {
        type : String, 
        required : true
    },
    status : {
        type: String,
        enum: {
          values: ['pending', 'completed'],
          message: 'Allowed values for status Type are pending and completed'
        },
        default: "pending"
    },
    transactionDate : {
        type : String,
        required : true
    },
    recordStatus : {
        type : Boolean,
        default : true
    }
})


transactionSchema.index({userEmail : 1} , {name : 'userEmail_idx'})
transactionSchema.index({recordStatus: 1}, {name : 'recordStatus_idx'})


const transactionDataModel = mongoose.model('transaction', transactionSchema)

const addTransactionRecord = async ( payload ) =>{
    try {
        const result = await transactionDataModel.create(payload)
        return result
    } catch (err) {
        logger.error(`Error while adding transaction data`, err)
        throw err
    }
}

const getTransactions = async ( query ) => {
    try {
        const transactions = await transactionDataModel.find(query).lean()
        return transactions
    } catch (err) {
        logger.error(`Error while fetching transactions data`, err)
        throw err
    }
}

const updateTransaction = async ( id , updateParams ) =>{
    try {
        const transactions = await transactionDataModel.updateOne({ _id : id }, { $set: updateParams }, { new: true })
        return transactions
    } catch (err) {
        logger.error(`Error while fetching transactions data`, err)
        throw err
    }
}

const deleteTransaction = async ( id ) => {
    try {
        return transactionDataModel.findByIdAndUpdate( id ,  { $set: { recordStatus : false } } )
    } catch (err) {
        logger.error(`Error while deleting transactions data`, err)
        throw err
    }
}


module.exports = {
    addTransactionRecord,
    getTransactions,
    updateTransaction,
    deleteTransaction
}

