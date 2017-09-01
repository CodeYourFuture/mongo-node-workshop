const fs = require('fs');
const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');
const dbClient = require('../helpers/dbClient');
const MongoClient = require('mongodb').MongoClient;
const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';

// router.get('/', function (req, res) {

router.get('/', (req, res)=> {
    const callback = (error, posts) => {
        res.render('index', {
            title: "Won's profile",
            subheading: "A modern Website built in Node with Handlebars",
            posts: posts
        });
    }
    dbClient.getPosts({}, callback);
});


router.get('/post-:postId', (req, res) => {
    const postId = req.params.postId;

    const callback = (error, posts) => {
        res.render('single-post', {
            title: post[0].title,
            subheading: "A modern Website built in Node with Handlebars",
            post: posts[0]
        });
    };

    dbClient.getPosts({
        _id: ObjectId(postId)},callback);
});


// creating a new function 

router.get('/my-cv', function (req, res) {
    res.render('my-cv');
});

router.get('/admin', function (req, res) {
    res.render('admin');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});

router.get('/follow me', function (req, res) {
    res.render('follow me');
})
module.exports = router;