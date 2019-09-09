/*
mongoose are possible to handle validations
Be sure to readup on how to handle validations using mongodb
it uses validator.js behind the scenes https://mongoosejs.com/docs/validation.html
*/
import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
});

const User = new Mongoose.model("User", UserSchema);
export default User;
