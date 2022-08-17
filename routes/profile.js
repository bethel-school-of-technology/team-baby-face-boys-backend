var express = require('express');
var router = express.Router();
const { User, Post } = require('../models');
var authService = require('../services/auth')

//GET user secure routing. returns profile and most recent post*
router.get('/:jwt', (req, res, next) => {
    let token = req.params.jwt;
    authService.verifyUser(token).then(user => {
        if(user){
            Post.findOne({
                where: {
                    UserId: user.id
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                attributes: ['id','postBody', 'postTitle', 'createdAt', 'updatedAt', 'UserId']
            }).then(post => {
                if(post) {
                    res.json({
                        gamerID: user.gamerID,
                        postTitle: post.postTitle,
                        postBody: post.postBody
                    })
                } else {
                    res.json({
                        gamerID: user.gamerID
                    })
                }
                
            })
        } else {
            res.status(401).send('You most be logged in')
        }
    })
})


//POST to post to forum
router.post('/:jwt', async (req,res,next) => {
    let token = req.params.jwt

    const user = await authService.verifyUser(token);
    if(!user){
        res.status(403).send();
        return
    }

    console.log(req.body);

    //create post
    Post.create({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody,
        UserId: user.id
    }).then(newPost => {
        console.log('test2');
        res.json({
            postTitle: newPost.postTitle,
            postBody: newPost.postBody
        });
        return
    }).catch((error) => {
        console.log('test3');
        res.json({error:error});
    })
    console.log('test4');
})



//PUT for latest post *
router.put('/:jwt', (req, res, next) => {
    let token = req.params.jwt;
    authService.verifyUser(token).then(user => {
        if(user){
            Post.update(
                {
                    postTitle: req.body.postTitle,
                    postBody: req.body.postBody
                }, {
                    where: {
                        UserId: user.id
                    }
                }
            ) 
        }
    }).then(post => {
        res.json(post);
    }).catch(() => {
        res.status(400).send()
    })
})

module.exports = router;