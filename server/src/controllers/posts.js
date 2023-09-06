import Post from '../model/posts.model.js';
import User from '../model/user.model.js';
import postValidation from '../utils/validations/post.js';

//* --- create-post ---*//

export const createPost = async (req, res) => {
  try {
    const { error, value } = postValidation(req.body);

    const userExists = await User.findOne({ _id: value.authorId });
    if (!userExists) return res.status(400).send({ success: true, message: 'User Does Not Exists' });

    const post = new Post({
      title: value.title,
      content: value.content,
      author: value.author,
      authorId: value.authorId,
    });

    await post.save();

    return res.status(200).send({ success: true, message: 'Post Created Successfully' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* --- update-post ---*//

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const postExists = await Post.find({ _id: id });
    if (!postExists) return res.status(400).send({ success: true, message: 'Post Does Not Exists' });

    const { error, value } = postValidation(req.body);

    const post = {
      title: value.title,
      content: value.content,
    };

    await Post.updateOne({ authorId: value.authorId }, post);

    return res.status(200).send({ success: true, message: 'Post updated Successfully' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* --- get-all-post ---*//

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find({});

    return res.status(200).send({ success: true, message: 'Get all post Successfull', post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* --- get-post ---*//

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const post = await Post.findOne({ _id: id });

    return res.status(200).send({ success: true, message: 'Get all post Successfull', post });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

//* --- delete-post ---*//

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.deleteOne({ _id: id });

    return res.status(200).send({ success: true, message: 'Delete post Successfull' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* --- like-post ---*//

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.updateOne({ _id: id }, { $inc: { like: 1 } });

    return res.status(200).send({ success: true, message: 'Like post Successfull' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* --- dislike-post ---*//

export const dislikePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.updateOne({ _id: id }, { $inc: { dislike: 1 } });

    return res.status(200).send({ success: true, message: 'Dislike post Successfull' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* --- search-post ---*//

export const searchPost = async (req, res) => {
  try {
    const { keyword } = req.query;

    console.log(keyword);
    const post = await Post.find({ title: { $regex: keyword, $options: 'i' } });

    return res.status(200).send({ success: true, message: 'Search post Successfull', post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* --- get-post-by-id ---*//

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.find({ authorId: id });

    return res.status(200).send({ success: true, message: 'Search post Successfull', post });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
