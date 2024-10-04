/** @format */

import express from "express";
import enterController from "../controllers/enter.controller";
const enterRoutes = express.Router();

enterRoutes.post("/enter", enterController.enter);
enterRoutes.post("/finished", enterController.finished);

export default enterRoutes;
