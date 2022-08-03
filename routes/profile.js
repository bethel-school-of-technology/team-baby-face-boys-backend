var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
const { User, Post } = require('../models');
var authService = require('../services/auth')

//GET user by id *
// router.get('/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     User.findOne({
//         where: {
//             id: id
//         }
//     }).then(user => {
//         if (user){
//             res.json({
//                 gamerID: user.gamerID
//             })
//         } else {
//             res.status(400).send()
//         }
//     }), err => {
//         res.status(500).send(err)
//     }
// })
router.get('/', (req, res , next) => {
    let token = req.cookies.jwt;
    authService.verifyUser(token).then(user => {
        if(user){
            res.json({
                gamerID: user.gamerID
            })
        }
    })

})


//POST to post to forum
router.post('/:id', (req, res, next) => {
    Post.create({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    }).then(newPost => {
        res.json(newPost)
    }).catch(() => {
        res.status(400)
    })
})

//GET for latest post //need to add JWT for this to work
// router.get('/:id', (req, res, next) => {
//     const latestPost = parseInt(req.params.id);

//     Post.findOne({
//         where: {
//             id: latestPost
//         }
//     }).then(latestPost => {
//         res.json(latestPost)
//     }).catch(() => {
//         res.status(400)
//     })
// })


//PUT for latest post //need to add JWT
// router.put('/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     if(!id || id < 0){
//         res.status(400).send()
//     }
//     Post.update({
//         postTitle: req.body.postTitle,
//         postBody: req.body.postBody
//     }, {
//         where: {
//             id: id
//         }
//     }).then(() => {
//         res.status(204).send()
//     }).catch(() => {
//         res.status(400).send()
//     })
// })

module.exports = router;