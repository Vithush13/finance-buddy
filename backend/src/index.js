import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import http from "http"; 
import { fileURLToPath } from "url";
import connectDatabase from "./config/database.js";  
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import userRoutes from"./routes/users.js"
import { Server } from "socket.io";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middleware to handle CORS
app.use(
  cors({
  origin: process.env.CLIENT_URL || "*",
  method: ["GET","POST", "PUT", "DELETE"],
  allowedHeaders:["Content-Type", "Authorization"],
  })
)
// connect to MongoDB using helper
connectDatabase();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/users", userRoutes);

// ✅ Create HTTP server for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"]
  }
});

// Make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/uploads',express.static(path.join(__dirname,"uploads")));
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
