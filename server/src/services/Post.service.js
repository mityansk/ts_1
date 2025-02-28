const { Post } = require('../db/models');

class PostService {
  static async getAll() {
    return await Post.findAll();
  }

  static async getById(id) {
    return await Post.findByPk(id);
  }

  static async create(postData) {
    return await Post.create(postData);
  }

  static async update(id, updatedData) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    const updatedPost = await Post.update(updatedData, {
      where: { id },
      returning: true,
    });
    console.log(updatedPost, '<<<<<<<<<<<<<<');
    return updatedPost;
  }

  static async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) return null;
    await post.destroy();
    return post;
  }
}

module.exports = PostService;
