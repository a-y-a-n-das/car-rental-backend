import { type Response } from "express";
import { type userReq } from "../types/types.js";
declare function auth(req: userReq, res: Response, next: any): Promise<void>;
export default auth;
//# sourceMappingURL=authMiddleware.d.ts.map