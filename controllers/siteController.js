const fs = require('fs');
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const dbClient = require('../helpers/dbClient');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Post = require('../models/Posts');
const formidable = require('express-formidable');

const mongoConnection = process.env.MONGO_URI || 'mongodb://localhost:27017/profile';
// const mongoose = require('mongoose');

// router.get('/', function (req, res) { 'mongodb://localhost:27017/profile';

router.use(formidable());
router.get('/', (req, res) => {
    const callback = (error, posts) => {
        res.render('index', {
            title: "Won's profile",
            subheading: "A modern Website built in Node with Handlebars",
            posts: posts
        });
    }
    mongoose.connect(mongoConnection);
    Post.find({}, callback);
});


router.post('/save-post', (req, res) => {

    const post = req.fields;

    console.log(req.fields); // contains non-file fields
    const callback = (error, post) => {
        // handle any errors which might ocur
        if (error) {
            console.error(error);
            return res.redirect('/error');
        }

        console.log('post saved successfully', post);
        res.redirect('/');
    }

    mongoose.connect(mongoConnection);
    // This is using the Model to create an object
    // based on the fields submitted from the form
    const newPost = new Post(req.fields);
    newPost.save(callback);
});




router.get('/post-:postId', (req, res) => {
    const postId = req.params.postId;

    const callback = (error, posts) => {
        
        res.render('single-view', {
            title: posts[0].title,
            subheading: "A modern Website built in Node with Handlebars",
            post: posts[0]
        });
    };

    dbClient.getPosts({
        _id: ObjectId(postId)
    }, callback);
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