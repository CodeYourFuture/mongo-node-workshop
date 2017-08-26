const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

router.use(bodyParser.json());
const ObjectID = require('mongodb').ObjectID;



router.get('/students', (req, res) => {
    const mongoConnection = 'mongodb://localhost:27017/profile';
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find();
        cursor.toArray((error, students) => {
            db.close();
            res.json(students);
        });
    });
});

router.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const mongoConnection = 'mongodb://localhost:27017/profile';
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find(ObjectID(studentId));
        cursor.toArray((error, students) => {
            db.close();
            res.json(students);
        });
    });
});

router.get('/posts/:id', (req, res,next) => {
    //const studentId = req.params.id;
    const postId = req.params.id;
    const mongoConnection = 'mongodb://localhost:27017/profile';
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find(ObjectID(postId));
        cursor.toArray((error, posts) => {
            db.close();
            res.json(posts);
        });
    });
});

router.get('/posts/', (req, res,next) => {
    
    const mongoConnection = 'mongodb://localhost:27017/profile';
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find();
        cursor.toArray((error, posts) => {
            db.close();
            res.json(posts);
        });
    });
});


    
module.exports = router;