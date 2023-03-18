import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplier: String,
    address: String,
    phone: Number,
  },
  { strict: false }
);

module.exports = mongoose.models.supplier || mongoose.model("supplier", supplierSchema);
