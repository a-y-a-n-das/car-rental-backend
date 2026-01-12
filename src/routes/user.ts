import { Router } from "express";
import { type Request, type Response } from "express";
import jwt, { type Jwt } from "jsonwebtoken";
import { createUser, findUser } from "../queries/user.ts";
import bcrypt from "bcrypt";
import type { IUser } from "../types/types.ts";

const router = Router();

const bcrypt_sec = process.env.SECRET || "sec5t";

router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (username == "" || password == "")
    res.send("username or password can't be empty");
  const hashedPass = bcrypt.hash(password, 12);
  
  const user = await createUser(username, password);
  if (user)
    res.status(201).json({ message: "user created successfully", user });
  else {
    res.status(500).json({
      success: false,
      error: "bleh",
    });
  }
});


router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  if (username == "" || password == ""){
    res.send("username or password can't be empty");
    return
  }
  
  const user: IUser | null = await findUser(username);
  if (user)
    res.status(404).json({ message: "user not found" });
  
  if(password!= user?.password){
    res.send("Invalid Credentials")
    return
  }
  const id = user?.id

  const token = jwt.sign({ userId: id, username }, bcrypt_sec);
  
  res.status(200).json({message: "login successful", token})
});




export const userRoute = router;
