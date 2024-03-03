# fintech_app_HimanshuRanjan

This is a fintech app consisting two main modules - User and Transaction. We are using NOSQL db as mongodb here. For auth we have used passport js. We are using custom and anonomous strategy. We are also using jwt for password encoding. We are following MVC structure here where for each module we have seperate structure. All the queries and validation part is done in utility file of the modules. Auth changes are done in auth js.

To run the app use - npm start
To run test for user - npm userTest
Tu run test for transaction - npm transactionTest

User Module

  1-> /register - create new user ( normal or admin )
  2-> /getUsers - getUsers based on query 
  3-> /:email/updateUserDetails - used to update user . Can also be used to soft delete users.
  4-> /login - login user based on email and password . It returns a token which can be used as auth token. The auth token along with email in header is used for authentication.

Transaction Module

  1-> /createTransaction - create new Transaction
  2-> /getUserTransaction - get User transactions on the basis of query type ( transactionType , spendType or any other). 
  3-> /updateTransactionDetails/:id - used to update transaction . Can also be used to soft delete transaction.
  4-> /deleteTransaction/:id - used to soft delete transaction by id.

.env Values 

PORT=3000
DBHOST=mongodb://127.0.0.1:27017/fintech
JWTExpiry=43200
AUTHSECRET=254ADC687BCA01327CC01150F6B6AE7C8B4A93BE32ED09324A442A932B58B7B6
SALTROUND=10
TRANSACTION_TYPE_SPEND=spend
TRANSACTION_TYPE_EARNING=earning
CREATE_OPERATION=create


  
