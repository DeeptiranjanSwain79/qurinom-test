import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/cathcAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import UserModel, { userRoleEnum } from "../models/user.model";
import { sendToken } from "../utils/jwt";

interface IRegistrationBody {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
}

export const registerUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, phone, password, role = userRoleEnum.USER, } = req.body as IRegistrationBody;

        const isEmailExists = await UserModel.findOne({ email: email.toLowerCase() });
        if (isEmailExists) {
            throw new ErrorHandler(`Email '${email}' is already associated with another user`, 400);
        }
        const newUserObj: IRegistrationBody = {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            role,
            phone,
        }

        const newUser = await UserModel.create(newUserObj);

        sendToken(newUser, 201, res, "User registered successfully");
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

interface ILoginBody {
    email: string;
    password: string;
}

export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as ILoginBody;

        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & password", 400));
        }

        const user = await UserModel.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid Credentials", 400));
        }

        const isMatchingPassword = await user.comparePassword(password);
        if (!isMatchingPassword) {
            return next(new ErrorHandler("Invalid Password", 400));
        }
        sendToken(user, 200, res, "User logged in successfully");
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

