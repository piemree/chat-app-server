import * as mongoose from 'mongoose';
import {genSalt,hash} from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre<User>('save', function (next: Function) {
  const user = this;
  if (user.password) {
      genSalt(10, function (err, salt) {
          if (err) return next(err);

          hash(user.password, salt, (err, hash) => {
              if (err) return next(err);
              user.password = hash;
              next();
          });
      })
  }
});

export interface User extends mongoose.Document {
  id: string;
  username: string;
  email: string;
  password: string;
}