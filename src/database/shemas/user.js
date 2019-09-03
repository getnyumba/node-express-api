import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  second_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: {
    type: String,
    required: true
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  isVerified: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdDate: {
    type: Date,
    default: Date.now
  }
});

userSchema
  .virtual('password')
  .set(function(password) {
    /* eslint no-underscore-dangle: 0 */
    this._password = password;
    this.hash = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  encryptPassword(password) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }
};

const tokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
});

const User = new mongoose.model('User', userSchema);
const Token = new mongoose.model('Token', tokenSchema);
export { User, Token };
