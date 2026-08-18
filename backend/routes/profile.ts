import { Router } from "express";

const router = Router();

// GET /profile
router.get("/", (req, res) => {
  res.json({
    name: "Leonard Phokane",
    email: "leonard4@example.com",
    role: "Full-Stack Engineer",
    bio: "End-to-end mastery — API, database, and interface.",
  });
});

// PUT /profile
router.put("/", (req, res) => {
  const { name, bio } = req.body;
  res.json({ message: "Profile updated", name, bio });
});

export default router;
