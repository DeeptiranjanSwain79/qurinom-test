require("dotenv").config();
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDB from "./utils/db";
import { ErrorMiddleWare } from "./middleware/error";
import { getAllActiveAdminEmails } from "./services/user.service";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import storeRouter from "./routes/store.routes";
const app = express();

connectToDB();
const API_VERSION = process.env.API_VERSION || "v1";

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("API is working fine")
});

app.use(`/api/${API_VERSION}/auth`, authRouter);
app.use(`/api/${API_VERSION}/users`, userRouter);
app.use(`/api/${API_VERSION}/store`, storeRouter);

app.use(ErrorMiddleWare);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});
