const router = require('express').Router();
const PostController = require('../controllers/Post.Controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

router
  .get('/', PostController.getAllPosts)
  .get('/:id', PostController.getPostById)
  .post('/', verifyAccessToken, PostController.createPost)
  .put('/:id', verifyAccessToken, PostController.updatePost)
  .delete('/:id', verifyAccessToken, PostController.deletePost);

module.exports = router;
