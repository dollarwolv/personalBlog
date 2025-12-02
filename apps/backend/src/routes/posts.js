import express from "express";
const postsRouter = express.Router();
import * as postsController from "../controllers/postsController.js";
import { requireJwt } from "../config/passport.js";
import commentsRouter from "./comments.js";

postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/drafts", postsController.getAllDrafts);
postsRouter.post("/new", requireJwt, postsController.createPost);
postsRouter.post("/new-draft", requireJwt, postsController.createDraft);
postsRouter.put("/:id", requireJwt, postsController.updatePost);
postsRouter.delete("/:id", requireJwt, postsController.deletePost);
postsRouter.get("/:id", postsController.getOnePost);

postsRouter.use("/:id/comments", commentsRouter);

export default postsRouter;
