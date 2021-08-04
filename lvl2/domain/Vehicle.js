import mongoose from "mongoose";

const VehicleSchema = mongoose.Schema({
  plate: String,
  parked: Boolean,
  lng: Number,
  lat: Number,
  alt: Number,
})

export default mongoose.model["Vehicle"] || mongoose.model("Vehicle", VehicleSchema);
