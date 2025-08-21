import UserModel, { userRoleEnum } from "../models/user.model"

export const getAllActiveAdminEmails = async () => {
    const users = await UserModel.find({ role: userRoleEnum.ADMIN, isActive: true });
    return users ? users.map(user => user.email) : [];
}