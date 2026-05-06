import { model, models, Schema } from "mongoose";

const leaveApplicationSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  type: { type: String, enum: ["SICK", "CASUAL", "ANNUAL"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
});

const LeaveApplication = models.User || model("User", leaveApplicationSchema);

export default LeaveApplication;
