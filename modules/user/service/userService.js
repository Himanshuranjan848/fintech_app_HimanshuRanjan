const userUtilService = require("./userUtilService")
const userRepository = require("./../respository/user")
const logger = require("../../../logging/logger")
const bcrypt = require("bcrypt")

const userRegister = async ( name, email, mobile, password, role )=>{
    const users = await getAllUsers ( null , email , null, null )
    if( users.length != 0 ){
        logger.error("Unable to add user. User already exist with the given Email")
        throw new Error("Unable to add user. User already exist with the given Email")
    }else if( userUtilService.validateUserInput(name , email , mobile  , password )){
        logger.info("Invalid input for user object creation")
        throw new Error("Invalid input for user object creation")
    }
    
    await bcrypt.genSalt(process.env.SALTROUND).then(salt => {
        return bcrypt.hash(password, salt)
    })
    .then(hash => {
        password = hash
    })
    .catch(err => console.error(err.message))
    const user =userUtilService.createUserPayLoad(name , email , mobile , password , role )
    return userRepository.createUserRecord(user)
}

const getAllUsers = async ( name , email , role , mobile  ) => {
    const query = userUtilService.searchUsers( name , email , role , mobile )
    return userRepository.getUsers( query )
}

const updateUserDetails = async( email , updatedUserDetails )=>{
    return userRepository.updateUserDetails(email , updatedUserDetails)
}
const getUserForAuth = async ( email ) => {
    return userRepository.getUserForAuth( email );
}

module.exports =  {
    userRegister,
    updateUserDetails,
    getAllUsers,
    getUserForAuth
}