import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: String,
  fleetsRefs: [Number]
})

export default mongoose.model["User"] || mongoose.model("User", UserSchema);
