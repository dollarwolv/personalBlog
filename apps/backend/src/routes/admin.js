import express from "express";
import * as adminController from "../controllers/adminController.js";
import { requireJwt } from "../config/passport.js";

const adminRouter = express.Router();

adminRouter.put("/", requireJwt, adminController.makeAdmin);

export default adminRouter;
