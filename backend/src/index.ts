import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";

import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import postsRoutes from "./routes/posts";
import profileRoutes from "./routes/profile";
import mypostsRoutes from "./routes/myposts";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/posts", postsRoutes);
app.use("/profile", profileRoutes);
app.use("/myposts", mypostsRoutes);

// Health check
app.get("/", (req, res) => res.send("Backend running 🚀"));
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;

// ✅ Initialize DB before starting server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Data Source initialized");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization", err);
  });
