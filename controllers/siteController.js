const fs = require('fs');
const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb');
const dbClient = require('../helpers/dbClient');
const sortFunctionality = require('../helpers/sortFunctionality');

router.get('/', function (req, res) {
    const callback = (error, posts) => {
        res.render('index', {
            title: "Etza's profile",
            subheading: "A modern site driven by a database",
            posts: posts
        });
    }
    dbClient.getPosts({}, callback);
});

router.get('/post-:postId', function (req, res) {
    const postId = req.params.postId;

    const callback = (error, posts) => {
        res.render('single-view', {
            title: posts[0].title,
            subheading: "A modern site driven by a database",
            post: posts[0]
        });
    }
    dbClient.getPosts({
        _id: ObjectID(postId)
    }, callback);
});


router.get('/newestPosts', function (req, res) {        
        const callback = (error, posts) => {
            res.render('posts', {
                title: posts.title,
                posts: posts
            });
        }
        sortFunctionality.sortPosts({}, callback);
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