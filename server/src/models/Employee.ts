import mongoose, { model, models, Schema, Types } from "mongoose";
import { Department, DEPARTMENTS } from "../constants/departments.js";

interface IEmployee {
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  employmentStatus: "ACTIVE" | "INACTIVE";
  joinDate: Date;
  isDeleted: boolean;
  bio: string;
  department: Department;
}

const employeeSchema = new Schema<IEmployee>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    basicSalary: { type: Number, default: 0 },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    employmentStatus: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    joinDate: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
    bio: { type: String, default: "" },
    department: { type: String, enum: DEPARTMENTS },
  },
  { timestamps: true },
);

const Employee =
  mongoose.models.Employee || model<IEmployee>("Employee", employeeSchema);

export default Employee;
