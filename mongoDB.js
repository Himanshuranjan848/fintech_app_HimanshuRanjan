const mongooseLib = require('mongoose')

module.exports = {
    MongoDBConnection: async () => {
        try {
            await mongooseLib.connect(process.env.DBHOST || 'mongodb://127.0.0.1:27017/fintech');
            console.log("database connected ")
        } catch (error) {
            console.log(error)
        }
    }
}


