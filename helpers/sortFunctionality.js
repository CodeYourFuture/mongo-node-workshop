const mongoConnection = process.env.Mongo_URL || "mongodb://127.0.0.1:27017/profile";

const { MongoClient } = require('mongodb');
//const { ObjectID } = require('mongodb');


const sortPosts = (query, successCallback) => {
    MongoClient.connect(mongoConnection, (err, db) => {
       // var ObjectID = { post: -1 };
        const cursor = db.collection("posts").find().sort([['_id', -1]]);
        cursor.toArray((error, posts) => {
            db.close();
            successCallback(error, posts);
        });

    });
};

module.exports = {
    sortPosts
};