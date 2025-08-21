import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/cathcAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import UserModel from "../models/user.model";
import { encryptResponse } from "../utils/encryptResponse";

export const getMyDetails = catchAsyncError(async (req: any, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ user: encryptResponse(req.user) });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

interface IUpdateUserBody {
    firstName: string;
    lastName: string;
    phone: string;
}

export const updateUserDetails = catchAsyncError(async (req: any, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, phone } = req.body as IUpdateUserBody;
        if (!firstName && !lastName && !phone) {
            return next(new ErrorHandler("Please provide at least one field to update.", 400));
        }
        const currentUserData = await UserModel.findById(req.user._id);
        if (!currentUserData) {
            return next(new ErrorHandler("User not found.", 404));
        }
        await UserModel.findByIdAndUpdate(currentUserData._id,
            {
                firstName: firstName || currentUserData.firstName,
                lastName: lastName || currentUserData.lastName,
                phone: currentUserData.phone
            },
            { new: true, runValidators: true }
        );

        const updatedUser = await UserModel.findById(currentUserData._id);
        if (updatedUser) {
            const userObj = {
                id: updatedUser._id,
                firstName: updatedUser.firstName,
                lasstName: updatedUser.lastName,
                email: updatedUser.email,
                role: updatedUser.role,
            }
            res.status(200).json({ user: encryptResponse(userObj) });
        } else {
            return next(new ErrorHandler("Something went wrong. Please try agian later!", 500));
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});
