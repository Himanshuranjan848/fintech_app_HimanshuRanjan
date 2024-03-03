const { sign } = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()


const searchUsers = (name = null , email = null, role = null , phone = null ) => {
    let basicFilter = {} 

    if( name  != null )
        basicFilter["userName"] = { $regex: name }
    
    if( email != null )
        basicFilter["userEmail"] = email

    if( role != null )
        basicFilter["role"] = role

    if(phone != null)
        basicFilter["phone"] = phone

    return basicFilter
}

const createUserPayLoad = (name , email , mobile , password , role ) => {
    const user = {
        userName : name , 
        userEmail : email,
        mobile : mobile , 
        password : password ,
        role : role || 'User'
    }
    return user
}
const isMobileValid = (mobile) => {
    const re = /^([+]\d{2})?\d{10}$/;
    return re.test(mobile)
}
const isNameValid = (name) => {
    const re = /^[a-zA-Z ]{2,30}$/
    return re.test(name)
}
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email);
};

const validateUserInput = (name  , email  , mobile , password ) => {
    if(!isNameValid(name) || !isEmailValid(email) || !isMobileValid(mobile) || password.length < 8 ){
        return true;
    }
    return false
}

const generateUserJWTToken = async (userEmail) => {
    if (!userEmail) return null
    const pData = {
        email: userEmail
    }
    let currentDate = Math.floor(Date.now() / 1000)
    const expiry = currentDate + parseInt(process.env.JWTExpiry)
    let newJwtToken = sign(pData, process.env.AUTHSECRET , {
        expiresIn: expiry,
      } )
    return newJwtToken
}

  
module.exports = {
    searchUsers,
    createUserPayLoad,
    validateUserInput,
    generateUserJWTToken
}
