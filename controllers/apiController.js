const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
router.use(bodyParser.json());
const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';
const mongoose = require('mongoose');
const Post = require('../models/Post.js');


router.get('/students', (req, res) => {
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find({});
        cursor.toArray((error, students) => {
            db.close();
            res.json(students);
        });
    });
});
router.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find(ObjectID(studentId));
        cursor.toArray((error, students) => {
            db.close();
            res.json(students);
        });
    });
});

router.get('/students/country/:id', (req, res, next) => {
    res.json(students);
});

router.get('/posts', (req, res, next) => {
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find({});
        cursor.toArray((error, posts) => {
            db.close();
            res.json(posts);
        });
    });
});


router.get('/posts/:id', (req, res, next) => {
    const postId = req.params.id;
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('post').find(ObjectID(postId));
        cursor.toArray((error, posts) => {
            db.close();
            res.json(posts);
        });
    });
});

// router.post('/posts', (req, res) => {
//     console.log(req.body);
//     res.status(500).send('not implemented');
// });


router.post('/posts', (req, res) => {
    const callback = (error, post) => {
        if (error) {
            console.error(error);
            return res.sendStatus(500);
        }

        console.log('post saved successfully', post);
        res.send(post);
    }

    const mongoConnection = 'mongodb://localhost:27017/profile';
    mongoose.connect(mongoConnection);
    // This is using the Model to create an object
    // based on the fields submitted from the form
    const newPost = new Post(req.body);
    newPost.save(callback);
});



module.exports = router;