var express = require('express');
var router = express.Router();
const { User, Post } = require('../models');
var authService = require('../services/auth')

// GET all posts. *
router.get('/', (req, res, next) => {
    Post.findAll().then(postList => {
        res.json(postList)
    })
})

//get post by id *
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    Post.findOne({
        where: {
            id: id
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

//create a post *
router.post('/', async (req,res,next) => {
    //get token from req
    const header = req.headers.authorization;
    if(!header){
        res.status(403).send();
        return
    }

    const token = header.split(' ')[1];

    //validate token / get user
    const user = await authService.verifyUser(token);
    if(!user){
        res.status(403).send();
        return;
    }
    //create post
    Post.create({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody,
        UserId: user.id
    }).then(newPost => {
        res.json(newPost)
    }).catch(() => {
        res.status(400)
    })
})

//delete a post
router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    Post.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(204).send('deleted')
    })
})

//edit post *
router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    if(!id || id < 0){
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

//route to GET users for user list *
router.get('/users', (req, res, next) => {
    User.findAll().then(userList => {
      res.json(userList)
    })
  })
  module.exports = router;