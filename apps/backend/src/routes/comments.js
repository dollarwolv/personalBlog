import express from "express";
const commentsRouter = express.Router({ mergeParams: true });
import * as commentsController from "../controllers/commentsController.js";
import { requireJwt } from "../config/passport.js";

commentsRouter.get("/", commentsController.getAllComments);
commentsRouter.post("/", requireJwt, commentsController.createComment);
commentsRouter.put("/:commentId", requireJwt, commentsController.editComment);
commentsRouter.delete(
  "/:commentId",
  requireJwt,
  commentsController.deleteComment
);

export default commentsRouter;
