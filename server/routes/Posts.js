import express, { Router } from 'express';
import { postController } from '../controllers/Posts.js';
import { auth } from '../middleWare/auth.js';
class Posts{
    router
  constructor(){
    this.router = new Router()
    this.onInit()
  }
  onInit(){
      this.router.post('/add-post',auth.validator,postController.addPost)
      this.router.post('/edit-post',auth.validator,postController.updatePost)
      this.router.get('/list',auth.validator,postController.getPosts)
      this.router.get('/detail',auth.validator,postController.getPost)
      this.router.get('/like',auth.validator,postController.postLikes)
      this.router.get('/delete',auth.validator,postController.deletePost)
      this.router.post('/comments/add',auth.validator,postController.addComment)
  }
}
export let postsRoute = new Posts()