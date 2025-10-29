import bcrypt from "bcryptjs";
import prisma from "../db/prisma.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function logInUser(req, res) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) return res.status(401).json({ error: "Username not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Wrong password." });

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
    }
  );

  res.json({ token });
}

export { logInUser };
