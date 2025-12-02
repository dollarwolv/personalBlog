import express from "express";
const meRouter = express.Router();
import * as meController from "../controllers/meController.js";
import { requireJwt } from "../config/passport.js";

meRouter.get("/", requireJwt, meController.sendMe);

export default meRouter;
