const fs = require('fs');
const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;


const dbClient=require('../helpers/dbClient.js');

router.get('/', function (req, res) {
    const callBack = (error, posts) => {
        if (error) {
            res.sendStatus(500)
        }
        else {
            res.render('index', {
                title: "MongoDB profile",
                subheading: "A modern Website built in Node with Handlebars",
                posts: posts
            });
        }
    }
    dbClient.getFromDatabase({},"posts", callBack)

});



router.get('/post-:postid', function (req, res) {
    const postId = req.params.postid;
    const callBack = (error, posts) => {
        if (error) {
            res.sendStatus(500)
        }
        else {
            res.render('single-post', {
                title: posts[0].title,
                subheading: "A modern Website built in Node with Handlebars",
                post: posts[0]
            });
        }
    }
    dbClient.getFromDatabase(ObjectID(postId),"posts", callBack)

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