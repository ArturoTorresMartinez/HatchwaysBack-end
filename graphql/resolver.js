const Post = require("../model/post");
const validator = require("validator");

module.exports = {
    hello() {
        //Hello for you guys!
        return "Hello you guys over at Hatchways!";
    },
    posts: async function (req) {
        //Get all posts!
        const totalPosts = await Post.find().countDocuments();
        const posts = await Post.find().sort({ createdAt: -1 });
        return {
            posts: posts.map(p => {
                return {
                    ...p._doc,
                    _id: p._id.toString(),
                    createdAt: p.createdAt.toISOString(),
                    updatedAt: p.updatedAt.toISOString()
                };
            }),
            totalPosts: totalPosts
        };
    },
    post: async function ({ id }, req) {
        //Get one post!
        const post = await Post.findById(id);
        return { ...post._doc, _id: post._id.toString(), createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() };
    },
    createPost: async function ({ postInput }, req) {
        //Create one post!
        const post = new Post({
            title: postInput.title,
            content: postInput.content,
            creator: postInput.creator
        });
        const createdPost = await post.save();
        return {
            ...createdPost._doc,
            id: createdPost._id.toString(),
            createdAt: createdPost.createdAt.toISOString(),
            updatedAt: createdPost.updatedAt.toISOString()
        };
    },
    updatePost: async function ({ id, postInput }, req) {
        //Update post by ID!
        const post = await Post.findById(id);
        console.log(post);
        post.title = postInput.title;
        post.content = postInput.content;
        post.creator = postInput.creator;
        const updatedPost = await post.save();
        return {
            ...updatedPost._doc,
            id: updatedPost._id.toString(),
            createdAt: updatedPost.createdAt.toISOString(),
            updatedAt: updatedPost.updatedAt.toISOString()
        };
    },
    deletePost: async function ({ id }, req) {
        //Delete post!
        await Post.findByIdAndRemove(id);
        return true;
    }
};
