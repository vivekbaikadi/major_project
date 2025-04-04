import { expressjwt } from "express-jwt";

function authJwt() {
    const secret = process.env.JSON_WEB_TOKEN_SECRET_KEY;
    return expressjwt({ secret: secret, algorithms: ["HS256"] });
}

export default authJwt;
