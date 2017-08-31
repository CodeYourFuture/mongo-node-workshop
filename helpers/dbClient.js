const mongoConnection = "mongodb://127.0.0.1:27017/profile";

const {MongoClient} = require('mongodb');



const getPosts = (query, successCallback) => {
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection("posts").find(query);
        cursor.toArray((error, posts) => {
            db.close();
            successCallback(error, posts);
        });
    });
};

module.exports = {
    getPosts 
};