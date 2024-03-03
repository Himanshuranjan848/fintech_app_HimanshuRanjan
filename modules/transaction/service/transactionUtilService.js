const userService = require("./../../user/service/userService")
const { isNumber } = require("lodash")
const moment  = require("moment")
const dotenv = require('dotenv')

dotenv.config()

const getTransactionQuery = async ( query ) => {
    const updatedQuery = {}
    const users = await userService.getAllUsers( null , query.email)
    if( users == null || users.length == 0 ){
        throw new Error("Invalid User For search")
    }
    if(query.transactionType == process.env.TRANSACTION_TYPE_SPEND ){
        updatedQuery.sender = users[0]._id
    }else if(query.transactionType == process.env.TRANSACTION_TYPE_EARNING){
        updatedQuery.receiver = users[0]._id
    }else{
        updatedQuery['$or'] = [{"sender": users[0]._id.toString() }, { "receiver" : users[0]._id.toString() }]
    }
    if(updatedQuery.expenseType)
        updatedQuery["expenseType"] = query.expenseType

    if(updatedQuery.status)
        updatedQuery["status"] = query.status
    
    if( query.getAllTransaction == false ){
        updatedQuery.recordStatus = true
    }

    return updatedQuery
}

const validateAndGetUpdatedData = async ( transactionData  ) => {

   const updatedTransactionData = {}
   if(transactionData.operation == process.env.CREATE_OPERATION){
        if(transactionData.sender === transactionData.receiver )
           throw new Error("sender can not be same as receiver")

        updatedTransactionData['sender'] = await verifyAndUpdateUser( transactionData.sender )
        updatedTransactionData['receiver'] = await verifyAndUpdateUser( transactionData.receiver )
        const formattedDate = moment().format('YYYY-MM-DD');
        updatedTransactionData['transactionDate'] =  moment(formattedDate).toISOString();
        updatedTransactionData.amount = isNumber(transactionData.amount) ? transactionData.amount : ( new Error("Amount not Valid"))
        updatedTransactionData.status = transactionData.status || "pending"
        updatedTransactionData.expenseType = transactionData.expenseType || "Untitled"
   }else{
        if( transactionData.amount )
            updatedTransactionData.amount = isNumber(transactionData.amount) ? transactionData.amount : ( new Error("Amount not Valid"))

        if( transactionData.status )
            updatedTransactionData.status = transactionData.status

        if( transactionData.expenseType )
            updatedTransactionData.expenseType = transactionData.expenseType 
   }
 
   updatedTransactionData.recordStatus = transactionData.recordStatus || true
   return updatedTransactionData
}

const verifyAndUpdateUser = async ( userEmail ) => {
    const users = await userService.getAllUsers( null , userEmail)
    if( users == null || users.length == 0 ){
        throw new Error("Invalid User For search")
    }
    return users[0]._id
}


module.exports = {
    getTransactionQuery,
    validateAndGetUpdatedData
}