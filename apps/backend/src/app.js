import express from "express";
import signupRouter from "./routes/sign-up.js";

const app = express();
app.use(express.json());

app.use("/sign-up", signupRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
