import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  thumbnail: { type: Array },
  online: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);

export default User;
