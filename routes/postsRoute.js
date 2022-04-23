const express = require('express');
const router = express.Router();

// 從 controller 得到 對應要求的方法 GET POST PATCH DELETE
const postController = require('../controllers/postController');

router.param('id', postController.checkID);

// get (客戶端得到訊息)
router
  .route('/')
  .get(postController.getAllPosts) // client-side get info
  .post(postController.createNewPost); // Create a post (posts)    //path:  /api/posts

// get
router
  .route('/:id')
  .get(postController.getPersonalPost)
  .patch(postController.updatePost) // renew post
  .delete(postController.deletePost); // api/post/:id

module.exports = router;
