# Fintech App
#### Himanshu Ranjan

## Overview

This fintech app comprises two main modules: User and Transaction. MongoDB is used as the NoSQL database, and Passport.js is employed for authentication with custom and anonymous strategies. JWT is utilized for password encoding. The application adheres to the MVC structure, where each module has a separate structure. Queries and validation are handled in utility files specific to each module, while authentication changes are managed in the auth.js file.

## Running the App
To start the app, use the following command:

### Run : 
```
npm start
```

### To run tests : 
```
npm run test
```

## User Module
1. **/register** - Create a new user (normal or admin).
2. **/getUsers** - Retrieve users based on a specified query.
3. **/:email/updateUserDetails** - Update user details or perform a soft delete.
4. **/login** - Log in a user using their email and password. The endpoint returns a token, which serves as the authentication token. Include the token and email in the header for authentication.

## Transaction Module
1. **/createTransaction** - Create a new transaction. ##
2. **/getUserTransaction** - Retrieve user transactions based on a specified query type (transactionType, spendType, or others).  ##
3. **/updateTransactionDetails/:id** - Update transaction details or perform a soft delete.  ##
4. **/deleteTransaction/:id** - Soft delete a transaction by its ID.

## .env Values
Configure the following environment variables in your `.env` file:

- PORT - Set to 3000.
-  DBHOST - MongoDB connection string, e.g., mongodb://127.0.0.1:27017/fintech.
- JWTExpiry - JWT expiration time (in seconds), e.g., 43200.
-  AUTHSECRET - Secret key for authentication. 
- SALTROUND - Set to 10 for password hashing.    
- TRANSACTION_TYPE_SPEND - Specify the transaction type for spending, e.g., spend. 
- TRANSACTION_TYPE_EARNING - Specify the transaction type for earning, e.g., earning. 
- CREATE_OPERATION - Specify the operation type for creating, e.g., create.

---
