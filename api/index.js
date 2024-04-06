const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const bookRoutes = require("./routes/book.route");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.route");

dotenv.config();

const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO, {
    dbName: "booksell",
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
// app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
