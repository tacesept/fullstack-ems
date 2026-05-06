import { model, models, Schema } from "mongoose";

interface IUser {
  email: string;
  password: string;
  role: "ADMIN" | "EMPLOYEE";
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "EMPLOYEE"], default: "EMPLOYEE" },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
