import axios from "axios";
import queryString from "query-string";
import { BASE_URL, TOKEN_KEY } from "../utils/constants";

export const baseURL = BASE_URL;

const BackendAPI = axios.create({
    baseURL,
});

export default BackendAPI;

export const PrivateAPI = axios.create({
    baseURL,
    paramsSerializer: (params) => {
        return queryString.stringify(params)
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
PrivateAPI.interceptors.request.use(async (config: any) => {
    return {
        ...config,
        headers: {
            token: getToken(),
        },
    };
});

export const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, `Bearer ${token}`);
}

export const getToken = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    return token;
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}