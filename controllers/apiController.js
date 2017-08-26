const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

router.use(bodyParser.json());

router.get('/students/:studentid', (req, res) => {
    const studentID = req.params.studentid;
    console.log(studentID);
    const mongoConnection = 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find(ObjectID(studentID));
        cursor.toArray((error, students) => {
            db.close();
            res.json(students[0]);
        });
    });
});

router.get('/students/country/:country', (req, res) => {
    const studentsdefinedbyCountry = req.params.country;
    const mongoConnection = 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find({"Country":studentsdefinedbyCountry});
        cursor.toArray((error, studentsdefinedbyCountry) => {
            db.close();

            res.json(studentsdefinedbyCountry);
        });

    });

});


        router.get('/posts', (req, res, next) => {
            const mongoConnection = 'mongodb://localhost:27017/profile';
            MongoClient.connect(mongoConnection, (err, db) => {
                const cursor = db.collection('posts').find({});
                cursor.toArray((error, posts) => {
                    db.close();
                    res.json(posts);
                });
            });

        });

        router.post('/posts', (req, res) => {
            console.log(req.body);
            res.status(500).send('not implemented');
        });

        module.exports = router;