import { Router } from "express";
import { type Request, type Response } from "express";
import jwt, { type Jwt } from "jsonwebtoken";
import { createUser, findUser } from "../queries/user.js";
import bcrypt from "bcrypt";
import type { IUser } from "../types/types.ts";

const router = Router();

const bcrypt_sec = process.env.SECRET || "sec5t";

router.post("/signup", async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body as { username: string; password: string; };
    if (username == "" || password == "")
      res.status(400).send("invalid inputs");
    const userExists = await findUser(username);
    if (userExists) {
      res.status(409).json({
        success: false,
        error: "username already exists",
      });
      return;
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const user = await createUser(username, hashedPass);
    if (user)
      res.status(201).json({status:true,  data: { message: "user created successfully", userId: user.id } });
    else {
      res.status(409).json({
        success: false,
        error: "User with this username already exists",
      });
    }
  
});


router.post("/login", async (req: Request, res: Response): Promise<void> => {
  
  const { username, password } = req.body as { username: string; password: string; };
  
  if (username == "" || password == ""){
    res.send("username or password can't be empty");
    return
  }
  
  const user: IUser | null = await findUser(username);

  if (!user){
    res.status(404).json({ message: "user not found" });
    return;
  } 
  
  if(!await bcrypt.compare(password, user?.password)){
    res.send("Invalid Credentials")
    return
  }
  const id = user?.id

  const token = jwt.sign({ userId: id, username }, bcrypt_sec, { expiresIn: "6h" });
  
  res.status(200).json({message: "login successful", token})
});




export const userRoute = router;
