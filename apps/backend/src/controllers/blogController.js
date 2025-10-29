import prisma from "../db/prisma.js";

export async function getAllPosts(req, res) {
  const posts = await prisma.post.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
  res.json(posts);
}

export async function createPost(req, res) {
  console.log(req.user);
  //   await prisma.post.create({
  //     data: {},
  //   });
  res.json({ message: "great success" });
}
