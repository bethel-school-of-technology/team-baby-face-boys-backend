var express = require('express');
var router = express.Router();
const { User, Post } = require('../models');

/* GET all posts. */
router.get('/', (req, res, next) => {
    Post.findAll().then(postList => {
        res.json(postList)
    })
})

//create a post
router.post('/', (req,res,next) => {
    Post.create({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    }).then(newPost => {
        res.json(newPost)
    }).catch(() => {
        res.status(400)
    })
})

  module.exports = router;