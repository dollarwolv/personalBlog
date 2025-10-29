import prisma from "../db/prisma.js";

export async function getAllPosts(req, res) {
  const posts = await prisma.post.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
  res.json(posts);
}

export async function createPost(req, res) {
  let { id } = req.user;
  const { title, text } = req.body;
  try {
    await prisma.post.create({
      data: {
        authorId: id,
        title,
        text,
      },
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err });
  }
}
