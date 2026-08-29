import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// GET /profile (protected)
router.get("/", authMiddleware, (req, res) => {
  res.json({
    name: "Leonard Phokane",
    email: (req as any).user?.email || "leonard4@example.com",
    role: "Full-Stack Engineer",
    bio: "End-to-end mastery — API, database, and interface.",
  });
});

// PUT /profile (protected)
router.put("/", authMiddleware, (req, res) => {
  const { name, bio } = req.body;
  res.json({ message: "Profile updated", name, bio });
});

export default router;
