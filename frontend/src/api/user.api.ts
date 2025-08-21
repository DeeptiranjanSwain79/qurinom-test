/* eslint-disable @typescript-eslint/no-explicit-any */
import { decryptResponse } from "../utils/decryptResponse";
import { saveUserInLocalStorage } from "./auth.api";
import { PrivateAPI } from "./axiosClient";

export const getMyProfile = async () => {
    try {
        const { data: resData, status } = await PrivateAPI.get('/users/me');
        if (status === 200) {
            const user = await decryptResponse(resData.user);
            saveUserInLocalStorage(resData.user);
            resData.user = user;
            return resData;
        } else {
            throw new Error("Registration failed");
        }
    } catch (error: any) {
        console.error("Error during registration:", error);
        throw new Error(error.response?.data?.message || "Registration failed");
    }
}