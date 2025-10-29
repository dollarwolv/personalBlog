import express from "express";
import signupRouter from "./routes/sign-up.js";
import loginRouter from "./routes/log-in.js";
import blogRouter from "./routes/blog.js";
import { requireJwt, configurePassport } from "./config/passport.js";
import passport from "passport";

const app = express();
app.use(express.json());

configurePassport();
app.use(passport.initialize());

app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.use("/blog", blogRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
