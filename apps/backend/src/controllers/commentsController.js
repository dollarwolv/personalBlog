import prisma from "../db/prisma.js";

export async function getAllComments(req, res) {
  const postId = req.params.id;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      orderBy: [{ createdAt: "desc" }],
    });
    res.json({ success: true, comments });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function createComment(req, res) {
  const { id } = req.user;
  const { postId } = req.params.id;
  const { text } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { authorId: id, text, postId },
    });
    res.json({ success: true, comment });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function editComment(req, res) {
  const commentId = req.params.commentId;
  const { text } = req.body;
  try {
    const comment = await prisma.comment.update({
      where: { id: Number(commentId) },
      data: { text },
    });
    res.json({ success: true, comment });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function deleteComment(req, res) {
  const commentId = req.params.commentId;
  try {
    const comment = await prisma.comment.delete({
      where: { id: Number(commentId) },
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
}
