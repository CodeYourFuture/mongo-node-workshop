const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const { MongoClient, ObjectID } = require('mongodb');
const dbClient = require('../helpers/dbClient');


router.use(bodyParser.json());




// First Callback Function to connect to database

const connectAndFindAll = function (collection, cb) {
    const mongoConnection = 'mongodb://localhost:27017/profile';    
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection(collection).find({});
        cursor.toArray((error, collection) => {
            db.close();
            cb(collection);
        });
    }
    )
};


// To do something with the information returned from Mongo

router.get('/students', (req, res, next) => {
    const success = (students) => res.json(students);
    connectAndFindAll("students",success);
});


router.get('/posts', (req, res, next) => {
    const success = (post) => res.json(post);
    connectAndFindAll("posts",success);
});

//Second Callback function to connect to database and retrieve a single post

const connectAndFindOne = function (req, collection, cb) {
    const collectionId = req.params.id;
    const mongoConnection = 'mongodb://localhost:27017/profile';    
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection(collection).find(ObjectID(collectionId)
    );
        cursor.toArray((error, collection) => {
            db.close();
            cb(collection);
        });
    }
    )
};


// To do something with the information returned from Mongo


router.get('/students/:id', (req, res, next) => {
    const success = (students) => res.json(students[0]);
    connectAndFindOne(req, "students",success);
    
})


router.get('/posts/:id', (req, res, next) => {
    const success = (posts) => res.json(posts[0]);
    connectAndFindOne(req, "posts",success);
    
})


// Third callback to connect to database ans retrieve post acording to the variable selected

/* var connectAndFind = function(type, callback, oneOrMany) {
    const collectionId = req.params.id;
    const mongoConnection = 'mongodb://localhost:27017/profile';    
    
    if(){

    };


};

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection(collection).find(ObjectID(collectionId)
    );
        cursor.toArray((error, collection) => {
            db.close();
            cb(collection);
        });
    }
    )

    
const mongoConnection = 'mongodb://localhost:27017/profile';    
MongoClient.connect(mongoConnection, (err, db) => {
    const cursor = db.collection(collection).find({});
    cursor.toArray((error, collection) => {
        db.close();
        cb(collection);
    });
}
)
 */



router.post('/posts', (req, res) => {
    console.log(req.body);
    res.status(500).send('not implemented');
});

module.exports = router;