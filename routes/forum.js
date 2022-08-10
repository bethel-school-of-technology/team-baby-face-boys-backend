var express = require('express');
var router = express.Router();
const { User, Post } = require('../models');
var authService = require('../services/auth')

// GET all posts and users *
router.get('/', (req, res, next) => {
    const token = req.cookies.jwt;
    authService.verifyUser(token).then(user => {
        if (user){
            Post.findAll().then(postList => {
                User.findAll().then(userList => {
                    res.json({
                        userList,
                        postList
                    })
                })
            })  
        } else {
            res.status(403).send('You must be logged in to see the forum')
        }
    })
})

//get post by id *
// router.get('/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     Post.findOne({
//         where: {
//             id: id
//         }
//     }).then(post => {
//         if (post){
//             res.json(post)
//         } else {
//             res.status(400).send()
//         }
//     }), err => {
//         res.status(500).send(err)
//     }
// })

//create a post *
router.post('/', async (req, res, next) => {
    let token = req.cookies.jwt

    const user = await authService.verifyUser(token);
    if (!user) {
        res.status(403).send('You must be logged in to make a post')
        return
    }

    //create post
    Post.create({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody,
        UserId: user.id
    }).then(newPost => {
        res.json({
            postTitle: newPost.postTitle,
            postBody: newPost.postBody
        })
    }).catch(() => {
        res.status(400)
    })
})

//delete a post
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const token = req.cookies.jwt;
    authService.verifyUser(token).then(user => {
        if (user) {
            Post.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.status(200).send('Post deleted');
            }).catch(() => {
                res.status(401).send('Something went wrong. Please try again')
            })
        } else {
            res.status(401).send('You must be logged in to delete a post');
        }
    })
})

//edit post *
router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const token = req.cookies.jwt;
    if (!id || id < 0) {
        res.status(400).send()
    }
    authService.verifyUser(token).then(user => {
        if (user){
            Post.update({
                postTitle: req.body.postTitle,
                postBody: req.body.postBody
            }, {
                where: {
                    id: id
                }
            }).then(post => {
                res.json(post)
            }).catch(() => {
                res.status(400).send()
            })
        } else{
            res.status(401).send('You must be logged in')
        }
    })
})

module.exports = router;