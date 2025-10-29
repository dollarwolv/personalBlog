import express from "express";
const blogRouter = express.Router();
import * as blogController from "../controllers/blogController.js";
import { requireJwt } from "../config/passport.js";

blogRouter.get("/", blogController.getAllPosts);
blogRouter.post("/new", requireJwt, blogController.createPost);

export default blogRouter;
