import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';
import config from '../config/';

const { DATABASE_URL } = config;

const mongoDb = () => {
    return mongoose.connect(DATABASE_URL);
}

export default mongoDb;


