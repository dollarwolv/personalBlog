import express from "express";
const commentsRouter = express.Router({ mergeParams: true });
import * as commentsController from "../controllers/commentsController.js";
import { requireJwt } from "../config/passport.js";

commentsRouter.get("/", commentsController.getAllComments);
commentsRouter.post("/", commentsController.createComment);
commentsRouter.put("/:commentId", commentsController.editComment);
commentsRouter.delete("/:commentId", commentsController.deleteComment);

export default commentsRouter;
