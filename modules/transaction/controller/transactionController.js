const router = require('express').Router()
const Status = require('http-status')
const transactionService = require("./../service/transactionService")
const auth = require("./../../../auth")



router.post('/createTransaction', auth.authenticate(true), async (req, res ) => {
    try {
      const result = await transactionService.addTransaction( req.body )
      res.status(Status.OK).json((result))
    } catch (e) {
      res.status(Status.BAD_REQUEST).send(e.message)
    }
})
  router.get('/getUserTransaction', auth.authenticate(true), async (req, res ) => {
    try {
      const requestQuery = req.query
      const result = await transactionService.getAllTransaction(requestQuery)
      res.status(Status.OK).json((result))
    } catch (e) {
      res.status(Status.BAD_REQUEST).send(e.message)
    }
  })

  router.put('/updateTransactionDetails/:id', auth.authenticate(), async (req, res) => {
    try {
      const request = req.body
      const result = await transactionService.updateTransactionDetails(req.params.id, request)
      res.status(Status.OK).json((result))
    } catch (e) {
      res.status(Status.BAD_REQUEST).send(e.message)
    }
  })

  router.put('/deleteTransaction/:id', auth.authenticate(), async (req, res) => {
    try {
      const result = await transactionService.deleteTransactionById( id )
      res.status(Status.OK).json((result))
    } catch (e) {
      res.status(Status.BAD_REQUEST).send(e.message)
    }
  })

  


module.exports = router