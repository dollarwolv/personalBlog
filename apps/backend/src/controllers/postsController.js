import prisma from "../db/prisma.js";

export async function getAllPosts(req, res) {
  const posts = await prisma.post.findMany({
    where: {
      published: {
        equals: true,
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });
  res.json(posts);
}

export async function getAllDrafts(req, res) {
  const posts = await prisma.post.findMany({
    where: {
      published: {
        equals: false,
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });
  res.json(posts);
}

export async function createPost(req, res) {
  const { id } = req.user;
  const { title, text } = req.body;
  const { role } = req.user;
  if (role !== "ADMIN") return res.status(403).send("You can't do that bro.");
  try {
    await prisma.post.create({
      data: {
        authorId: id,
        published: true,
        title,
        text,
      },
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function createDraft(req, res) {
  const { id } = req.user;
  const { title, text } = req.body;
  const { role } = req.user;
  if (role !== "ADMIN") return res.status(403).send("You can't do that bro.");
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
    res.json({ error: err.message });
  }
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { title, text, publish } = req.body;
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        text,
        published: publish,
        updatedAt: new Date(),
        ...(publish && { publishedAt: new Date() }),
      },
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const { role } = req.user;

  try {
    if (role !== "ADMIN") return res.status(403).send("You can't do that bro.");
    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function getOnePost(req, res) {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    res.json({ success: true, post: post });
  } catch (err) {
    res.json({ error: err.message });
  }
}
