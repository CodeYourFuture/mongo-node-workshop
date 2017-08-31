const MongoClient = require('mongodb').MongoClient;

const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';

const getFromDatabase = (query,collection, sucessCallBack) => {
    MongoClient.connect(mongoConnection, (error, db) => {
        const cursor = db.collection(collection).find(query);
        cursor.toArray((error, collections) => {
            db.close();
            sucessCallBack(error, collections)
        });
    });
}

module.exports = {
    getFromDatabase
}