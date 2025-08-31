import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";  // import your DB connection function

dotenv.config({ path: "./src/config/.env" });  // load correct .env path

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// connect to MongoDB using helper
connectDatabase();

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
