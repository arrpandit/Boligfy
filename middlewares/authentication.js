const { valiadateToken } = require("../utils/authentication");


function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if (!tokenCookieValue || tokenCookieValue==undefined) {
            return next();
        }
        try {
            const userPayload = valiadateToken(tokenCookieValue);
            req.user = userPayload
        } catch (error) {}

        return next();

    }
}

module.exports = {
    checkForAuthenticationCookie
}