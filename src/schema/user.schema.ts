import { Schema, model } from "mongoose";
import { hashSync } from "bcrypt"
import { IUser } from "../@types/user.dto";
const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
userSchema.pre<IUser>("save", function (next) {
  this.password = hashSync(this.password, parseInt(process.env.SALT as unknown as string))
  next()
})
const user = model("user", userSchema)
export { user }