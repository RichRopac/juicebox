const express = require('express');
const tagsRouter = express.Router();
const { getAllTags } = require('../db');

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
  
    next();
  });
  
  
  tagsRouter.get('/', async (req, res) => {
    const posts = await getAllTags();
    
    res.send({
      "posts": [posts]
    });
  });

module.exports = tagsRouter;