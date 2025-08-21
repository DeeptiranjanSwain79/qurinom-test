import { USER_KEY } from "../utils/constants";
import { decryptResponse } from "../utils/decryptResponse";
import BackendAPI, { saveToken } from "./axiosClient";

export const saveUserInLocalStorage = (userHash: string) => {
    localStorage.setItem(USER_KEY, userHash);
}

export const getUserFromLocalStorage = () => {
    const hashedUser = localStorage.getItem(USER_KEY) as string;
    if (!hashedUser) return null;
    const user = decryptResponse(hashedUser);
    if (user) {
        return user;
    }
    return null;
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem(USER_KEY);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const registerUser = async (data: any) => {
    try {
        const { data: resData, status } = await BackendAPI.post('/auth/register', data);
        if (status === 201) {
            const user = await decryptResponse(resData.user);
            saveUserInLocalStorage(resData.user);
            resData.user = user;
            if (resData.token) {
                saveToken(resData.token);
            }
            return resData;
        } else {
            throw new Error("Registration failed");
        }
    } catch (error: any) {
        console.error("Error during registration:", error);
        throw new Error(error.response?.data?.message || "Registration failed");
    }
}
export const loginUser = async (data: any) => {
    try {
        const { data: resData, status } = await BackendAPI.post('/auth/login', data);
        if (status === 200) {
            const user = await decryptResponse(resData.user);
            saveUserInLocalStorage(resData.user);
            resData.user = user;
            if (resData.token) {
                saveToken(resData.token);
            }
            return resData;
        } else {
            throw new Error("Login failed");
        }
    } catch (error: any) {
        console.error("Error during registration:", error);
        throw new Error(error.response?.data?.message || error.message || "Login failed");
    }
}