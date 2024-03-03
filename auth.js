'use strict'
const logger = require('./logging/logger')
const passport = require('passport')
const AnonymousStrategy = require('passport-anonymous').Strategy
const passportCustom = require('passport-custom')
const moment = require('moment')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const CustomStrategy = passportCustom.Strategy;
const userService = require("./modules/user/service/userService")
const { npm } = require('winston/lib/winston/config')


const customStrategy = new CustomStrategy( function(req, done) {
    logger.info(`auth call for api call ${req.baseUrl + req.path}, time: ${moment().format()}`)

    if(req.headers.authorization != null ){
        try{
            const jwtToken = req.headers.authorization
            const decode = jwt.verify(jwtToken, process.env.AUTHSECRET )
            if( decode.email == req.headers.email )
                done(null, decode)
            else 
                done(new Error( 'User Auth token is not valid'), null)
        }catch(e){
            throw new Error("Auth token inValid or not provided")
        }
    }else{
        userService.getUserForAuth( req.body.email ).then(async user => {
           
            if ( !user || !user.recordStatus  ) {
                logger.info(`Invalid or Inactive User `)
                done(new Error('Invalid or Inactive User '), null)
            }

            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (err){
                    console.log(err);
                    done(new Error(' Error with bcrypt '), null)
                }else if (result){
                    console.log(" password match ");
                    done(null, user)
                }else{
                    done(new Error('Password not matched '), null)
                }
            });
        })
        .catch(error => {
            done(error, null)
        })
    }
})

passport.use(customStrategy)
passport.use(new AnonymousStrategy())

passport.serializeUser(function(user, done) {
done(null, user)
})

passport.deserializeUser(function(user, done) {
done(null, user)
})

const initialize = () => {
    return passport.initialize()
}

function authenticate(mandatory = true) {
    let strategies = ['custom']
    if (!mandatory) {
      strategies = ['anonymous']
    }
    return passport.authenticate(strategies, { session: false })
}

module.exports =  { authenticate , initialize } 

