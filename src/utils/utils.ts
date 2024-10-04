/** @format */

import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL || "";
export const jwtSecret = process.env.JWT_SECRET || "";
export const botToken = process.env.BOTTOKEN || "salom";
export const textFlowToken = process.env.TEXTFLOWTOKEN || "";
export const geminiToken = process.env.TOKENAI || "";
