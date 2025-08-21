import CryptoJS from "crypto-js";
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret";

export const encryptResponse = (resObj: any): string => {
    const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(resObj),
        SECRET_KEY
    ).toString();

    return ciphertext;
};
