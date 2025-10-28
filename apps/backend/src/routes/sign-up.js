import express from "express";
import { createUser } from "../controllers/signupController.js";

const signupRouter = express.Router();

signupRouter.post("/", createUser);
signupRouter.get("/", (req, res) => {
  res.send("hi");
});

export default signupRouter;
