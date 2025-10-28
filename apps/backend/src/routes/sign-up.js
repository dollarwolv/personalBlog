const Router = require("express");
const signupRouter = new Router();
const signupController = require("../controllers/signupController.js");

signupRouter.post("/", signupController.createUser);
signupRouter.get("/", (req, res) => {
  res.send("hi");
});

module.exports = signupRouter;
