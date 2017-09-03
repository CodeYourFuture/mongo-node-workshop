const fs = require('fs');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Post = require('../models/Post.js');
const mongoose = require('mongoose');
const formidable = require('express-formidable');

const dbClient = require('../helpers/dbClient');
const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';

router.use(formidable());
router.get('/', (req, res) => {
    const callback = (error, posts) => {
        res.render('index', {
            title: "Yohannes's profile",
            subheading: "A Great Website driven by a database",
            posts: posts
        });
    };
    mongoose.connect(mongoConnection);
    Post.find({}, callback);
});

router.get('/post-:postId', (req, res) => {
    const postId = req.params.postId;

    const callback = (error, post) => {

        res.render('single-post', {
            title: post.title,
            subheading: "A Great Website driven by a database",
            post: post
        });
    }
    // dbClient.getPosts({
    //     _id: ObjectID(postId)
    // }, callback);

    mongoose.connect(mongoConnection);
    Post.findById(postId, callback);
});

// const post = req.fields;
router.post('/save-post', (req, res) => {

    const callback = (error, post) => {
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