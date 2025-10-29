import express from "express";
const postsRouter = express.Router();
import * as postsController from "../controllers/postsController.js";
import { requireJwt } from "../config/passport.js";

postsRouter.get("/", postsController.getAllPosts);
postsRouter.post("/new", requireJwt, postsController.createPost);
postsRouter.put("/:id", requireJwt, postsController.updatePost);
postsRouter.delete("/:id", requireJwt, postsController.deletePost);
postsRouter.get("/:id", postsController.getOnePost);

export default postsRouter;
