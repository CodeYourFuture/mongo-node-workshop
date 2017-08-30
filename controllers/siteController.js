const fs = require('fs');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';
const objectID = require('mongodb').objectID;

router.get('/', function (req, res) {
    // Write code to connect to database and return posts
    console.log(mongoConnection);
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find({});
        cursor.toArray((error, posts) => {
            db.close();
            // res.json(posts);
            res.render('index', {
                title: "Yohannes's profile",
                subheading: "A Great Website driven by a database",
                posts: posts
            });
        });
    });
});

router.get('/post-:postId', (req, res) => {
    const postId = req.params.postId;
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find(ObjectID(postId));
        cursor.toArray((error, posts) => {
            db.close();
            res.render('single-post', {
                title: posts[0].title,
                subheading: "A Great Website driven by a database",
                post: posts[0]
            });
        });
    });
});

router.get('/my-cv', function (req, res) {
    res.render('my-cv');
});

router.get('/admin', function (req, res) {
    res.render('admin');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});

module.exports = router;