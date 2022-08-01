var express = require('express');
var router = express.Router();
const { User, Post } = require('../models');

/* GET all posts. */
router.get('/', (req, res, next) => {
    Post.findAll().then(postList => {
        res.json(postList)
    })
})

//get post by id
router.put('/:id', (req, res, next) => {
    const postId = parseInt(req.params.id);
    Post.findOne({
        where: {
            postId: postId
        }
    }).then(post => {
        if (post){
            res.json(post)
        } else {
            res.status(400).send()
        }
    }), err => {
        res.status(500).send(err)
    }
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

//delete a post
router.delete('/:id', (req, res, next) => {
    const postId = parseInt(req.params.id);
    Post.destroy({
        where: {
            postId: postId
        }
    }).then(() => {
        res.status(204).send('deleted')
    })
})

//edit post
router.put('/:id', (req, res, next) => {
    const postId = parseInt(req.params.id);
    if(!postId || postId < 0){
        res.status(400).send()
    }
    Post.update({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.status(204).send()
    }).catch(() => {
        res.status(400).send()
    })
})

//route to GET users for user list
router.get('/users', (req, res, next) => {
    User.findAll().then(userList => {
      res.json(userList)
    })
  })
  module.exports = router;