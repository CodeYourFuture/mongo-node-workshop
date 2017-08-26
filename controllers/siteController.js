const fs = require('fs');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


router.get('/', function (req, res) {
    const mongoConnection = process.env.MONGODB_URI|| 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection("posts").find({});
        cursor.toArray((error, posts) => {
            db.close();
            // send the data to the Template to render
            res.render('index', {
                title: "Etza's profile",
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