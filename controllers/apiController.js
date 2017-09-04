const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const Post = require('../models/Posts');

router.use(bodyParser.json());

router.get('/students', (req, res) => {

    const mongoConnection = 'mongodb://localhost:27017/profile';
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find({});
        cursor.toArray((error, students) => {
            db.close();
            res.json(students);
        });
    });
});

router.get('/students/:studentid', (req, res) => {
    const studentID = req.params.studentid;
    console.log(studentID);
    const mongoConnection = 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find(ObjectID(studentID));
        cursor.toArray((error, students) => {
            db.close();
            res.json(students[0]);
        });
    });
});


router.get('/students/country/:country', (req, res) => {
    const studentsdefinedbyCountry = req.params.country;
    const mongoConnection = 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find({ "Country": studentsdefinedbyCountry });
        cursor.toArray((error, studentsdefinedbyCountry) => {
            db.close();
            res.json(studentsdefinedbyCountry);
        });

    });

});

router.get('/api/posts', (req, res, next) => {

    const post = req.body;

    console.log(req.body); // contains non-file fields
    const callback = (error, post) => {
        // handle any errors which might ocur
        if (error) {
            console.error(error);
            return res.redirect('/error');
        }

        console.log('post saved successfully', post);
        res.send(post);
    }

    mongoose.connect(mongoConnection);
    // This is using the Model to create an object
    // based on the fields submitted from the form
    const newPost = new Post(req.body);
    newPost.save(callback);

    router.post('/posts', (req, res) => {
        console.log(req.body);
        res.status(500).send('not implemented');
    });


    //     const mongoConnection = 'mongodb://localhost:27017/profile';
    //     MongoClient.connect(mongoConnection, (err, db) => {
    //         const cursor = db.collection('posts').find({});
    //         cursor.toArray((error, posts) => {
    //             db.close();
    //             res.json(posts);
    //         });
    //     });

    // });

    module.exports = router;