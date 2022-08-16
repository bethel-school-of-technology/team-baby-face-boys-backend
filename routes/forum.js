var express = require('express');
var router = express.Router();
const { User, Post } = require('../models');
var authService = require('../services/auth');

// GET all posts and users *
router.get('/:jwt', (req, res, next) => {
    const token = req.params.jwt;
    authService.verifyUser(token).then(user => {
        if (user) {
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
router.post('/:jwt', async (req, res, next) => {
    let token = req.params.jwt

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
router.delete('/:jwt', (req, res, next) => {
    const id = req.body.id;
    const token = req.params.jwt;
    authService.verifyUser(token).then(user => {

        /*
         // deleting user\
        if (user.id == id || user.admin) {
            User.destroy(...)
        }
         */

        if (user) {
            Post.findOne({
                where: {
                    id: id,
                }
            }).then(post => {
                if (post.UserId == user.id || user.admin) {
                    post.destroy()
                    res.status(200).send('Post deleted');
                } else {
                    res.status(403).send("You don't have permission to delete a post");
                }
            }).catch(() => {
                res.status(401).send('Something went wrong. Please try again')
            })
        } else {
            res.status(403).send('You must be logged in to delete a post');
        }
    })
})

//edit post *
router.put('/:jwt', (req, res, next) => {
    const id = parseInt(req.body.id);
    const token = req.params.jwt;
    if (!id || id < 0) {
        res.status(400).send()
    }

    authService.verifyUser(token).then(user => {
        if(user){
            Post.update({
                postTitle: req.body.postTitle,
                postBody: req.body.postBody
            },{
                where: {
                    id: id
                }
            }).then(post => {
                res.json(post).send()
            })
        } else {
            res.status(403).send('You must be logged in.')
        }
    })
    // authService.verifyUser(token).then(user => {
    //     if(user){
    //         Post.findOne({
    //             where: {
    //                 id: id
    //             }
    //         }).then(post => {
    //             if(post.UserId == user.id || user.admin){
    //                 post.update({
    //                     postTitle: req.body.postTitle,
    //                     postBody: req.body.postBody
    //                 }), {
    //                     where: {
    //                         UserId: user.id
    //                     }
    //                 }
    //             } else {
    //                 res.status(403).send(`You cannot edit other user's posts.`)
    //             }
    //         }).catch(() => {
    //             res.status(401).send('Something went wrong. Please try again.')
    //         })
    //     } else {
    //         res.status(403).send('You must be logged in to edit a post')
    //     }
    // })
})

module.exports = router;