import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    user: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
