const PostService = require('../services/Post.service');
const isValidId = require('../utils/isValidId');
const PostValidator = require('../utils/Post.validator');
const formatResponse = require('../utils/formatResponse');
const reformatId = require('../utils/reformatId');

class PostController {
  static async getAllPosts(req, res) {
    try {
      const Posts = await PostService.getAll();
      
      //! Проверка на длину списка задач (обработка негативного кейса)
      if (Posts.length === 0) {
        return res.status(204).json(formatResponse(204, 'No Posts found', []));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', Posts));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getPostById(req, res) {
    const { id } = req.params;

    //! Проверка на валидность ID (обработка негативного кейса) (можно делать и не внутри try/catch)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid Post ID'));
    }

    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const data = await PostService.getById(reformatId(id));

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!data) {
        return res
          .status(404)
          .json(formatResponse(404, `Post with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', data));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async createPost(req, res) {
    const { title, body } = req.body;
    const user = res.locals.user;            
    
    //! Проверка наличия необходимых данных - Используем PostValidator (обработка негативного кейса)
    const { isValid, error } = PostValidator.validate({ title, body });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      //? За запросы в БД отвечает сервис
      const newPost = await PostService.create({ title, body, authorId: user.id });

      //! Проверка на существование новой задачи (обработка негативного кейса)
      if (!newPost) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new Post`));
      }

      //* Успешный кейс
      res.status(201).json(formatResponse(201, 'success', newPost));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async updatePost(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;
    const user = res.locals.user;

    //! Проверка на валидность ID (обработка негативного кейса)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid Post ID'));
    }

    const post = await PostService.getById(reformatId(id));
    if (+user.id !== post.authorId) {
      return res
        .status(400)
        .json(formatResponse(400, 'Недостаточно прав, похоже, ты IDOR!'));
    }

    //! Проверка наличия необходимых данных - Используем PostValidator (обработка негативного кейса)
    const { isValid, error } = PostValidator.validate({ title, body });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }
    
    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number без утилиты)
      const updatedPost = await PostService.update(+id, { title, body });

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!updatedPost) {
        return res
          .status(404)
          .json(formatResponse(404, `Post with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', updatedPost));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async deletePost(req, res) {
    const { id } = req.params;
    const user = res.locals.user;

    const post = await PostService.getById(reformatId(id));
    if (+user.id !== post.authorId) {
      return res
        .status(400)
        .json(formatResponse(400, 'Недостаточно прав, похоже, ты IDOR!'));
    }
    //? получить задачу по id (Post)
    //? проверить, что Post.author_id === user.id
    //* удалить и ответить - 200
    //! отказать, если не совпали id - 400

    //! Проверка на валидность ID (обработка негативного кейса)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid Post ID'));
    }

    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const deletedPost = await PostService.delete(reformatId(id));

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!deletedPost) {
        return res
          .status(404)
          .json(formatResponse(404, `Post with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200);
      res
        .status(200)
        .json(formatResponse(200, `Post with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = PostController;
