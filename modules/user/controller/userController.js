const router = require('express').Router()
const Status = require('http-status')
const userService = require("./../service/userService")
const userUtilService = require("./../service/userUtilService")
const auth = require("./../../../auth")



router.post('/register', auth.authenticate(false), async (req, res ) => {
    try {
      const request = req.body
      const result = await userService.userRegister(request.name, request.email, request.mobile, request.password, request.role )
      res.status(Status.OK).json(result)
    } catch (e) {
      res.status(Status.BAD_REQUEST).send(e.message)
    }
})
  router.get('/getUsers', auth.authenticate(true), async (req, res ) => {
    try {
      const requestQuery = req.query
      const result = await userService.getAllUsers(requestQuery.name, requestQuery.email, requestQuery.role)
      res.status(Status.OK).json(result)
    } catch (e) {
      res.status(Status.BAD_REQUEST).send(e.message)
    }
  })

  router.put('/:email/updateUserDetails', auth.authenticate(true),  async (req, res) => {
    try {
      const request = req.body
      const result = await userService.updateUserDetails(req.params.email, request)
      res.status(Status.OK).json(result)
    } catch (e) {
      res.status(Status.BAD_REQUEST).send(e.message)
    }
  })

  router.post("/login" , auth.authenticate(true) , async (req ,res ) => {
    try{
      const result = await userUtilService.generateUserJWTToken(req.body.email)
      res.status(Status.OK).json(result)
    }catch(e) {
      res.status(Status.BAD_REQUEST).send(e.message)
    }
  })

  


module.exports = router