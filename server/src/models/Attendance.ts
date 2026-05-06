import { model, models, Schema, Types } from "mongoose";

interface IAttendance {
  employeeId: Types.ObjectId;
  date: Date;
  checkIn: Date;
  checkOut: Date;
  status: "PRESENT" | "ABSENT" | "LATE";
  workingHours: number;
  dayType: "Full Day" | "Three Quarter Day" | "Half Day" | "Short Day" | null;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: Date, required: true },
    checkIn: { type: Date, default: null },
    checkOut: { type: Date, default: null },
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LATE"],
      default: "PRESENT",
    },
    workingHours: { type: Number, default: null },
    dayType: {
      type: String,
      enum: ["Full Day", "Three Quarter Day", "Half Day", "Short Day", null],
      default: null,
    },
  },
  { timestamps: true },
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const Attendance =
  models.User || model<IAttendance>("Attendance", attendanceSchema);

export default Attendance;
