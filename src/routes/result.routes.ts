/** @format */

import express from "express";
import resultController from "../controllers/result.controller";

const resultRoute = express.Router();

resultRoute.post("/create", resultController.create);
resultRoute.get("/getAll", resultController.getAll);
resultRoute.get("/getOne/:id", resultController.getOne);
resultRoute.delete("/delete/:id", resultController.delete);
resultRoute.put("/edit/:id", resultController.edit);

export default resultRoute;
