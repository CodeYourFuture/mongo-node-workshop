const fs = require('fs');
const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;


//router.get('/', function (req, res) {
// const filePath = __dirname + '/../data/posts.json';
// const callbackFunction = function(error, file) {
//     if(error) {
//         return next(error);
//     }
//     // we call .toString() to turn the file buffer to a String
//     const fileData = file.toString();
//     // we use JSON.parse to get an object out the String
//     const postsJson = JSON.parse(fileData);
//     // send the json to the Template to render
//     res.render('index', {
//       title: "Michael's profile",
//       subheading: "A modern Website built in Node with Handlebars",
//       posts: postsJson
//     });
// };
// fs.readFile(filePath, callbackFunction);

//});

router.get('/', function (req, res) {

    // Write code to connect to database and return posts

    const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {

        const cursor = db.collection('posts').find({});

        cursor.toArray((error, posts) => {

            db.close();

            // res.json(posts);

            res.render('index', {

                title: "MongoDB profile",

                subheading: "A modern Website built in Node with Handlebars",

                posts: posts
            });
        });
    });
});

router.get('/post-:postid', function (req, res) {
    const postId = req.params.postid;
    const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';    
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find(ObjectID(postId));
        cursor.toArray((error, posts) => {
            db.close();
            res.render('single-view', {
                title: posts.title,
                subheading: "A modern Website built in Node with Handlebars",
                post: posts[1]

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