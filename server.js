const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");
const profileRouter = require("./routes/api/profile");
const postsRouter = require("./routes/api/posts");
const path = require("path");

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT);
});
