# fintech_app_HimanshuRanjan

This fintech app comprises two main modules: User and Transaction. MongoDB is used as the NoSQL database, and Passport.js is employed for authentication with custom and anonymous strategies. JWT is utilized for password encoding. The application adheres to the MVC structure, where each module has a separate structure. Queries and validation are handled in utility files specific to each module, while authentication changes are managed in the auth.js file.

Running the App
To start the app, use the following command:

bash
Copy code
npm start
To run tests for the User module:

bash
Copy code
npm run userTest
To run tests for the Transaction module:

bash
Copy code
npm run transactionTest
User Module
/register - Create a new user (normal or admin).
/getUsers - Retrieve users based on a specified query.
/:email/updateUserDetails - Update user details or perform a soft delete.
/login - Log in a user using their email and password. The endpoint returns a token, which serves as the authentication token. Include the token and email in the header for authentication.

Transaction Module
/createTransaction - Create a new transaction.
/getUserTransaction - Retrieve user transactions based on a specified query type (transactionType, spendType, or others).
/updateTransactionDetails/:id - Update transaction details or perform a soft delete.
/deleteTransaction/:id - Soft delete a transaction by its ID.

.env Values
Configure the following environment variables in your .env file:

PORT - Set to 3000.
DBHOST - MongoDB connection string, e.g., mongodb://127.0.0.1:27017/fintech.
JWTExpiry - JWT expiration time (in seconds), e.g., 43200.
AUTHSECRET - Secret key for authentication.
SALTROUND - Set to 10 for password hashing.
TRANSACTION_TYPE_SPEND - Specify the transaction type for spending, e.g., spend.
TRANSACTION_TYPE_EARNING - Specify the transaction type for earning, e.g., earning.
CREATE_OPERATION - Specify the operation type for creating, e.g., create.
