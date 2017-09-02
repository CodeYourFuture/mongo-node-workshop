const mongoConnection = process.env.Mongo_URL || "mongodb://127.0.0.1:27017/profile";

const { MongoClient } = require('mongodb');



const getPosts = (query, successCallback) => {
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find({});
        cursor.toArray((error, collection) => {
            db.close();
            successCallback(error, collection);
        });
    });
};



module.exports = {
    getPosts 
};