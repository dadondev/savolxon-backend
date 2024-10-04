/** @format */

import express from "express";
import { DB_URL, geminiToken, PORT } from "./utils/utils";
import * as mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import testRoute from "./routes/test.routes";
import resultRoute from "./routes/result.routes";
import enterRoutes from "./routes/enter.routes";
import studentRoutes from "./routes/student.routes";
import teacherRoutes from "./routes/teacher.routes";
import cron from "node-cron";
import cors, { CorsOptions } from "cors";

import bot from "./bot/bot";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prefix from "./functions/prefix";
import authMiddleware from "./middlewares/auth";
import fileUpload from "express-fileupload";
const app = express();

const genAI = new GoogleGenerativeAI(geminiToken);
export const modelGemini = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});

const corsOptions: CorsOptions = {
	origin: ["http://localhost:5173", "https://savolxon.vercel.app"],
};
app.use(cors(corsOptions));
app.use(helmet({}));
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use("/api/teacher/tests", authMiddleware, testRoute);
app.use("/api/results", authMiddleware, resultRoute);
app.use("/api/student/test", enterRoutes);
app.use("/api/auth/student", authMiddleware, studentRoutes);
app.use("/api/auth/teacher", teacherRoutes);

async function bootstrap() {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, async () => {
			await bot.launch(() => {
				console.log("Project is running successfully");
			});
		});
	} catch (e) {
		console.log(e);
	}
}
bootstrap();

cron.schedule("* * * * *", async () => {
	await prefix();
	console.log("I am working!");
});
