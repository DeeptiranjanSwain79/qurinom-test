/* eslint-disable @typescript-eslint/no-explicit-any */
import { decryptResponse } from "../utils/decryptResponse";
import { PrivateAPI } from "./axiosClient";

export const createProduct = async (data: any) => {
    try {
        const { data: resData, status } = await PrivateAPI.post('/store/create', data);
        if (status === 201) {
            const temp = decryptResponse(resData.product);
            resData.product = temp;
            return resData;
        } else {
            throw new Error("Product Creation failed");
        }
    } catch (error: any) {
        console.error("Error during registration:", error);
        throw new Error(error.response?.data?.message || error.message || "Login failed");
    }
}

export const updateProduct = async (productId: string, data: any) => {
    try {
        const { data: resData, status } = await PrivateAPI.post(`/store/${productId}`, data);
        if (status === 200) {
            const temp = decryptResponse(resData.product);
            resData.product = temp;
            return resData;
        } else {
            throw new Error("Product Creation failed");
        }
    } catch (error: any) {
        console.error("Error during registration:", error);
        throw new Error(error.response?.data?.message || error.message || "Login failed");
    }
}

export const getProductDetails = async (productId: string) => {
    try {
        const { data: resData, status } = await PrivateAPI.get(`/store/${productId}`);
        if (status === 200) {
            const temp = decryptResponse(resData.product);
            resData.product = temp;
            return resData;
        } else {
            throw new Error("Product Creation failed");
        }
    } catch (error: any) {
        console.error("Error during registration:", error);
        throw new Error(error.response?.data?.message || error.message || "Login failed");
    }
}

export const deleteProduct = async (productId: string) => {
    try {
        const { data: resData, status } = await PrivateAPI.delete(`/store/${productId}`);
        if (status === 200) {
            return resData;
        } else {
            throw new Error("Product Creation failed");
        }
    } catch (error: any) {
        console.error("Error during registration:", error);
        throw new Error(error.response?.data?.message || error.message || "Login failed");
    }
}