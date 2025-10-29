import express from "express";
import * as loginController from "../controllers/loginController.js";

const loginRouter = express.Router();

loginRouter.post("/", loginController.logInUser);
loginRouter.get("/", (req, res) => {
  res.send("hi");
});

export default loginRouter;
