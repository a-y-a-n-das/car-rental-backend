import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response } from "express";
import { type userReq } from "../types/types.js";

interface jwt_Payload extends JwtPayload {
  userId?: string;
  username?: string;
}

async function auth(req: userReq, res: Response, next: any) {
  const token_arr: string[] | undefined = req.headers.authorization?.split(" ");

  if (token_arr && token_arr[0] == "Bearer") {
    if (token_arr[1] == "") {
      res.status(401).send("Token missing after Bearer");
      return;
    }
  } else {
    res.send("Authorization header missing");
    return;
  }

  const secret: string = process.env.SECRET || "secret";
  const token: string = token_arr[1] || ""; // there has to be a element
  const decoded = jwt.verify(token, secret) as jwt_Payload;
  if (decoded.userId && decoded.username) {
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
    };

    next();
  } else {
    res.status(401).send("Token invalid");
    return;
  }
}

export default auth;
