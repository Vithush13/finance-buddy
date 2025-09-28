
import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, savings: { type: Number, default: 0 } }
  ],
  invitations: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, status: { type: String, default: "pending" } }
  ]
}, { timestamps: true });


const Group = mongoose.model("Team", groupSchema);
export default Group;
