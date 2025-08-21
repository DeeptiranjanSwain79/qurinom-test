import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "./cathcAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/user.model";
require("dotenv").config();

// checks if user is authenticated and sets req.user with the user object if authenticated.
export const isAuthenticated = catchAsyncError(async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers["token"] as string;
    if (!token) {
        return next(new ErrorHandler('Please login to access this resource.', 401));
    }
    const refreshToken = token.split(" ")[1];
    const decoded = jwt.verify(refreshToken!, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded) {
        return next(new ErrorHandler('Invalid token.', 401));
    }

    const user = await UserModel.findById(decoded.id);
    if (!user) {
        return next(new ErrorHandler('User not found.', 404));
    }

    req.user = user;
    next();
});

// validate user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role || "")) {
            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`, 401));
        }
        next();
    }
}