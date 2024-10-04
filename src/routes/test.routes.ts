/** @format */

import express from "express";
import testController from "../controllers/test.controller";

const testRoute = express.Router();

testRoute.get("/alltests", testController.getListTests);
testRoute.get("/getone/:id", testController.getOne);
testRoute.put("/edit/:id", testController.edit);
testRoute.delete("/delete/:id", testController.delete);
testRoute.post("/create", testController.create);

testRoute.post("/file/upload/:id", testController.uploadFile);
testRoute.post("/add/:id", testController.addQuiz);
testRoute.put("/editquiz/:testId/:quizId", testController.editQuiz);
testRoute.delete("/deletequiz/:testId/:quizId", testController.deleteQuiz);

export default testRoute;
