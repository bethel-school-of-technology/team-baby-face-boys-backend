const jwt = require('jsonwebtoken');
const { User } = require('../models');

var authService = {
    signUser: user => {
        const token = jwt.sign(
            {
                gamerID: user.gamerID,
                id: user.id
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
            console.log('decoded',decoded)
            return User.findByPk(decoded.id);
        } catch(err) {
            console.log(err);
            return null;
        }
    }
}


module.exports = authService;