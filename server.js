const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");
const profileRouter = require("./routes/api/profile");
const postsRouter = require("./routes/api/posts");

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.use(
  express.json({
    extended: false
  })
);

app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/profile", profileRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT);
});
