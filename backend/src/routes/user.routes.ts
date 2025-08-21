import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/auth";
import { getMyDetails } from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/me").get(isAuthenticated, getMyDetails);


export default userRouter;