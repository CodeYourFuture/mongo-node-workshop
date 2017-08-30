const fs = require('fs');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoConnection = "mongodb://127.0.0.1:27017/profile";

//Change to E6



router.get('/', function (req, res) {
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection("posts").find({});
        cursor.toArray((error, posts) => {
            db.close();
            // send the data to the Template to render
            res.render('index', {
                title: "Etza's profile",
                subheading: "A modern site driven by a database",
                posts: posts
            });
        });
    });
});

router.get('/post-:postId', function (req, res) {
    const postId = req.params.postId;

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection("posts").find(ObjectID(postId));
        cursor.toArray((error, posts) => {
            db.close();
            // send the data to the Template to render
            res.render('single-view', {
                title: posts[0].title,
                subheading: "A modern site driven by a database",
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