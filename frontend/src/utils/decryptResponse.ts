import CryptoJS from "crypto-js";
import { SECRET_KEY } from "./constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decryptResponse = (encryptedText: string): any => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
};
