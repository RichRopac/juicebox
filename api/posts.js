const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, createPost } = require('../db');
const { requireUser } = require('./utils');

postsRouter.post('/', requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/)
  const postData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    
     postData.authorId = req.user.id
    console.log(req.user, "this is req user")
     postData.content = content
     postData.title = title
    // add authorId, title, content to postData object
    const post = await createPost(postData);
    console.log("this is whats coming back from post", post)
    // this will create the post and the tags for us
    // if the post comes back, res.send({ post });
    // otherwise, next an appropriate error object 
    res.send({ post })
  } catch ({ name, message }) {
    next({ name, message });
  }
});

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");
  
    next();
  });
  
  
  postsRouter.get('/', async (req, res) => {
    const posts = await getAllPosts();
    
    res.send({
      "posts": [posts]
    });
  });

module.exports = postsRouter;