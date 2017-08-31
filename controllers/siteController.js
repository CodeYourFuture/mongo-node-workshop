const fs = require('fs');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';

// router.get('/', function (req, res) {

router.get('/', function (req, res) {
    // Write code to connect to database and return posts
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find({});
        cursor.toArray((error, posts) => {
            db.close();
            // res.json(posts);
            res.render('index', {
                title: "Won's profile",
                subheading: "A modern Website built in Node with Handlebars",
                posts: posts
            });
        });
    });
});

router.get('/post-:postId', function(req, res){
    const postId = req.params.postId;
 MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find(ObjectId(postId));
        cursor.toArray((error, posts) => {
            db.close();
            // res.json(posts);
            res.render('single-post', {
                title: "Won's profile",
                subheading: "A modern Website built in Node with Handlebars",
                posts: posts[0]
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

router.get('/follow me', function (req, res){
    res.render('follow me');
})
module.exports = router;