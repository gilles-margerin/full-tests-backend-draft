import mongoose from "mongoose";

const FleetSchema = mongoose.Schema({
  _id: Number,
  vehicles: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  userId: String,
});

export default mongoose.model["Fleet"] || mongoose.model("Fleet", FleetSchema);
