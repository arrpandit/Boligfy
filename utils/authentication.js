const jwt = require('jsonwebtoken')

const secret = "#4nhfdfssmx";

function createTokenForuser(user){
    const payload = {
        _id: user._id,
        email:user.email,
        profileImageURL: user.profileImageURL,
        role:user.role
    }

    

    const token = jwt.sign(payload,secret);

    return token;
}

function valiadateToken(token){
    const  payload = jwt.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForuser,
    valiadateToken
}