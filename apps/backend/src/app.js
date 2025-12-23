import express from "express";
import signupRouter from "./routes/sign-up.js";
import loginRouter from "./routes/log-in.js";
import postsRouter from "./routes/posts.js";
import meRouter from "./routes/me.js";
import adminRouter from "./routes/admin.js";
import { requireJwt, configurePassport } from "./config/passport.js";
import passport from "passport";
import cors from "cors";

const app = express();
app.use(express.json());

configurePassport();
app.use(passport.initialize());

app.use(cors());

app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.use("/posts", postsRouter);
app.use("/me", meRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
