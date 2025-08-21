import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
require("dotenv").config();

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    wishlist: string[];
    cart: string[];
    comparePassword(candidatePassword: string): Promise<boolean>;
    signJwtToken(): string;
}

export enum userRoleEnum {
    USER = "USER",
    ADMIN = "ADMIN",
    MANAGER = "MERCHANT"
}

const userSchema: Schema<IUser> = new Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your first name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
        maxLength: [15, "Phone number can't exceed 15 digits."]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "Please select a role"],
        enum: Object.values(userRoleEnum),
        default: userRoleEnum.USER
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],
}, { timestamps: true });

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.signJwtToken = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing in environment variables");
    }
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "150d" }
    );
};

userSchema.methods.comparePassword = function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default UserModel;
