const express = require("express");
const signupRouter = require("./routes/sign-up");
const app = express();
app.use(express.json());
// const prisma = require("./db/prisma");

app.use("/sign-up", signupRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
