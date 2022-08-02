const jwt = require('jsonwebtoken');
const models = require ('../models');

var authService = {
    signUser: user => {
        const token = jwt.sign(
            {
                gamerID: req.body.gamerID,
                password: req.body.password
            },
                'secretkey',
            {
                expiresIn: '1h'
            }
        );
        return token;
    },
    verifyUser: token => {
        try {
            let decoded = jwt.verify(token, 'secretkey');
            return models.user.findByPk(decoded.id);
        } catch(err) {
            console.log(err);
            return null;
        }
    }
}

module.exports = authService;