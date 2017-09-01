


const {MongoClient} = require('mongodb');
const mongoConnection = process.env.MONGO_URL || 'mongodb://localhost:27017/profile';

const getPosts = (query, successCallback) => {

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find(query);
        cursor.toArray((error, posts) => {
            db.close();
            // res.json(posts);
            successCallback(error, posts);
        });
    });
};


module.exports= {
    getPosts
};