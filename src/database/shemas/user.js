import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true   
    }, 
    email: {
        type: String,
        unique: true
    }
});

const User = new mongoose.model('User', userSchema);
export default User;