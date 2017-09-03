const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        require: true
    },
    contents: String,
    summary: String
});

const Post = mongoose.model('Posts', schema);

module.exports = Post;