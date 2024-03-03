const mongoose = require('mongoose');
const logger = require('../../../logging/logger')


const userSchema = new mongoose.Schema({
    userName: {
        type : String,
        required: true
    },
    userEmail : {
        type : String,
        required : true
    } , 
    mobile: {
        type: Number
    },
    password : {
        type : String, 
        required : true
    },
    role : {
        type: String,
        enum: {
          values: ['User', 'Admin'],
          message: 'Allowed values for Role Type are User and Admin'
        },
        default: "User"
    },
    recordStatus : {
        type : Boolean,
        default : true
    }
})


userSchema.index({userEmail : 1} , {name : 'userEmail_idx'})
userSchema.index({recordStatus: 1}, {name : 'recordStatus_idx'})


const userDataModel = mongoose.model('user', userSchema)

const createUserRecord = async ( payload ) =>{
    try {
        const result = await userDataModel.create(payload)
        return result
    } catch (err) {
        logger.error(`Error while adding user data`, err)
        throw err
    }
}
const getUsers = async ( query ) => {
    try {
        const users = await userDataModel.find(query , { projection: { password:  0 } } ).lean()
        return users
    } catch (err) {
        logger.error(`Error while fetching users data`, err)
        throw err
    }
}
const getUserForAuth = async ( email )=>{
    try {
        const user = await userDataModel.findOne( { userEmail : email } ).lean()
        return user
    } catch (err) {
        logger.error(`Error while fetching users data`, err)
        throw err
    }
}
const updateUserDetails = async ( userEmail , updateParam ) => {
    try{
        const users = await userDataModel.update( { userEmail : userEmail} , { $set : updateParam }).lean()
        return users
    }catch(err){
        logger.error(`Error while updating user data`, err)
        throw err
    }
}

module.exports = {
    createUserRecord,
    getUsers,
    getUserForAuth,
    updateUserDetails
}

