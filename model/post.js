const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema with timestamps!
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        creator: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);