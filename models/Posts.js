const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: String,
    contents: String,
    summary: String
});

const Post = mongoose.model('posts', schema);

module.exports = Post;