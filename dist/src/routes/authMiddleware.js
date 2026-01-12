import jwt, {} from "jsonwebtoken";
import {} from "express";
import {} from "../types/types.js";
async function auth(req, res, next) {
    const token_arr = req.headers.authorization?.split(" ");
    if (token_arr && token_arr[0] == "Bearer") {
        if (token_arr[1] == "") {
            res.status(401).send("Token missing after Bearer");
            return;
        }
    }
    else {
        res.send("Authorization header missing");
        return;
    }
    const secret = process.env.SECRET || "secret";
    const token = token_arr[1] || ""; // there has to be a element
    const decoded = jwt.verify(token, secret);
    if (decoded.userId && decoded.username) {
        req.user = {
            userId: decoded.userId,
            username: decoded.username,
        };
        next();
    }
    else {
        res.status(401).send("Token invalid");
        return;
    }
}
export default auth;
//# sourceMappingURL=authMiddleware.js.map