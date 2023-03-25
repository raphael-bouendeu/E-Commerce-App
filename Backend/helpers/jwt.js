var { expressjwt: jwt } = require("express-jwt");

function authJwt() {

    return jwt({
        secret: process.env.secret ? process.env.secret : "",
        algorithms: ["HS256"],
    }).unless({ path: ["/api/v1/users/login"] })
}
module.exports = authJwt;