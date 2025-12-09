import prisma from "../db/prisma.js";

export async function getAllComments(req, res) {
  const postId = Number(req.params.id);
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
    });
    res.json({ success: true, comments });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function createComment(req, res) {
  const { id } = req.user;
  const postId = Number(req.params.id);
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
  const commentId = Number(req.params.commentId);
  const { id } = req.user;
  const { text } = req.body;
  try {
    const result = await prisma.comment.updateMany({
      where: { id: commentId, authorId: id },
      data: { text },
    });

    if (result.count === 0)
      return res.status(403).send("You can't do that bro.");

    res.json({ success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function deleteComment(req, res) {
  const { id, role } = req.user;
  const commentId = Number(req.params.commentId);

  try {
    const where =
      role === "ADMIN"
        ? { id: commentId } // admins can delete any comment
        : { id: commentId, authorId: id }; // users can only delete their own

    const result = await prisma.comment.deleteMany({ where });

    if (result.count === 0)
      return res.status(403).send("You can't do that bro.");

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
