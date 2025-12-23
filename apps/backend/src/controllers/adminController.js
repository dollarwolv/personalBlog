import prisma from "../db/prisma.js";
import "dotenv/config";

export async function makeAdmin(req, res) {
  const { id } = req.user;
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    try {
      const result = await prisma.user.updateMany({
        where: { id },
        data: { role: "ADMIN" },
      });

      if (result.count === 0) return res.status(403).send("User not found.");

      res.json({ success: true });
    } catch (err) {
      res.json({ error: err.message });
    }
  } else {
    res.status(403).send("Wrong password bucko.");
  }
}
