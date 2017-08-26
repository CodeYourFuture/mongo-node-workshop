const fs = require('fs');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';
    
router.get('/', function (req, res) {
    // Write code to connect to database and return posts
    const mongoConnection = 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('post').find({});
        cursor.toArray((error, posts) => {
            db.close();
            // res.json(posts);
            res.render('index', {
                title: "Michael's profile",
                subheading: "A modern Website built in Node with Handlebars",
                posts: posts
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