const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcryptjs')

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
            return User.findByPk(decoded.id);
        } catch(err) {
            console.log(err);
            return null;
        }
    },
    hashPassword: function(plainTextPassword) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
      },
      comparePasswords: function (plainTextPassword, hashedPassword) {
        return bcrypt.compareSync(plainTextPassword, hashedPassword)
      } 
}


module.exports = authService;