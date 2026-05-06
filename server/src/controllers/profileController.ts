import type { Request, Response } from "express";
import Employee from "../models/Employee.js";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      return res.json({
        firstName: "Admin",
        lastName: "",
        email: session.email,
      });
    }
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) return res.status(404).json({ error: "Employee" });
    if (employee.isDeleted) {
      return res.status(403).json({
        error: "Your account is deactivated. You cannot update your profile.",
      });
    }
    await Employee.findByIdAndUpdate(employee._id, {
      bio: req.body.bio,
    });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update profile" });
  }
};
