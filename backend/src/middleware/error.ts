import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleWare = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB ID error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}.`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate key error
    if (err.code === 1100) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token. Please try again.";
        err = new ErrorHandler(message, 401);
    }

    // Wrong jwt expired error
    if (err.name === "TokenExpiredError") {
        const message = "Token expired. Please login again.";
        err = new ErrorHandler(message, 401);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}