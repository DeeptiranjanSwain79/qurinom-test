import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGEBUCKET,
    messagingSenderId: process.env.FB_MESSAGINGSENDERID,
    appId: process.env.FB_APPID,
    measurementId: process.env.FB_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig as any);
const storage = getStorage(app);

export { app, storage };
