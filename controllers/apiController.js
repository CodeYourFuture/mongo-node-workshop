const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb');

router.use(bodyParser.json());

const dbClient = require('../helpers/dbClient.js');

router.get('/students', (req, res) => {
    const callBack = (error, students) => {
        if (error) {
            res.sendStatus(500)
        }
        else {
            res.json(students);
        }
    }
    dbClient.getFromDatabase({}, "students", callBack)
});

router.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const callBack = (error, students) => {
        if (error) {
            res.sendStatus(500)
        }
        else {
            res.json(students[0]);
        }
    }
    dbClient.getFromDatabase(ObjectID(studentId), "students", callBack)
});

router.get('/posts', (req, res, next) => {
    const callBack = (error, posts) => {
        if (error) {
            res.sendStatus(500)
        }
        else {
            res.json(posts);
        }
    }
    dbClient.getFromDatabase({}, "posts", callBack)
});

router.post('/posts', (req, res) => {
    console.log(req.body);
    res.status(500).send('not implemented');
});

module.exports =router;