// src/types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      session?: any; // Replace 'any' with your actual JWT payload type
    }
  }
}
