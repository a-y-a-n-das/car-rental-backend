import { Router } from "express"
import {type Request, type Response } from "express";
import jwt from "jsonwebtoken"
const router = Router();

router.post("/login", async (req: Request, res: Response): Promise<void>=>{
    const {username, password} = req.body;
    
})



export default router;