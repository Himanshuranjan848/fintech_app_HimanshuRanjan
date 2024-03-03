# Fintech App - Himanshu Ranjan

## Overview

This fintech app comprises two main modules: User and Transaction. MongoDB is used as the NoSQL database, and Passport.js is employed for authentication with custom and anonymous strategies. JWT is utilized for password encoding. The application adheres to the MVC structure, where each module has a separate structure. Queries and validation are handled in utility files specific to each module, while authentication changes are managed in the auth.js file.

## Running the App
To start the app, use the following command:

#Run
npm start
To run tests for the User module:

#Test
npm run test
To run tests for the Transaction module:


# User Module
/register - Create a new user (normal or admin).  \n
/getUsers - Retrieve users based on a specified query. \n
/:email/updateUserDetails - Update user details or perform a soft delete. \n
/login - Log in a user using their email and password. The endpoint returns a token, which serves as the authentication token. Include the token and email in the header for authentication.

# Transaction Module
/createTransaction - Create a new transaction. \n
/getUserTransaction - Retrieve user transactions based on a specified query type (transactionType, spendType, or others).  \n
/updateTransactionDetails/:id - Update transaction details or perform a soft delete.  \n
/deleteTransaction/:id - Soft delete a transaction by its ID.

# .env Values
Configure the following environment variables in your .env file:

PORT - Set to 3000.  \ 
DBHOST - MongoDB connection string, e.g., mongodb://127.0.0.1:27017/fintech. \n 
JWTExpiry - JWT expiration time (in seconds), e.g., 43200.  \n
AUTHSECRET - Secret key for authentication. \n
SALTROUND - Set to 10 for password hashing. \n
TRANSACTION_TYPE_SPEND - Specify the transaction type for spending, e.g., spend. \n
TRANSACTION_TYPE_EARNING - Specify the transaction type for earning, e.g., earning. \n
CREATE_OPERATION - Specify the operation type for creating, e.g., create. \n
