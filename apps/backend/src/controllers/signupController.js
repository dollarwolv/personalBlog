import bcrypt from "bcryptjs";
import prisma from "../db/prisma.js";

export async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.send({
      success: true,
      msg: null,
    });
  } catch (err) {
    console.error(err);
    res.send({
      success: false,
      msg: err.message,
    });
  }
}
