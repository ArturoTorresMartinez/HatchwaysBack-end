const Post = require("../model/post");
const validator = require("validator");

module.exports = {
  hello() {
    return "Hello you guys over at Hatchways!";
  },
  posts: async function(req) {
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
  createPost: async function({ postInput }, req) {
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
  updatePost: async function({ id, postInput }, req) {
    const post = Post.findById(id);
    return {
      ...post._doc,
      id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    };
  }
};
