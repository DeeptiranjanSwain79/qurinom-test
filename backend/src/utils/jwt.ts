import { Response } from "express";
import { IUser } from "../models/user.model";
import { encryptResponse } from "./encryptResponse";

export const sendToken = (user: IUser, statusCode: number, res: Response, message?: string) => {
    const token = user.signJwtToken();

    const userObj = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
    }

    res.status(statusCode).json({
        success: true,
        user: encryptResponse(userObj),
        token,
        message: message || "User logged in successfully"
    });
}