import mongoose from 'mongoose';
require('dotenv').config();

const dbUri = process.env.DB_URI || "";

const connectToDB = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectToDB, 5000);
    }
};

export default connectToDB;