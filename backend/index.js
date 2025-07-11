const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");

const PORT = 5005;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://stellar-rugelach-687945.netlify.app"], // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Optional: if you're using cookies or auth headers
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

const authRoute = require("./routes/authRoutes");
const blogRoute = require("./routes/blogRoutes");

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
