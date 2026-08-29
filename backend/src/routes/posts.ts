import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// GET /posts (protected)
router.get("/", authMiddleware, (req, res) => {
  res.json([
    {
      id: 1,
      title: "First Post",
      content: "Sharing my engineering insights.",
      author: { id: 2, email: "alice@example.com" },
    },
    {
      id: 2,
      title: "Second Post",
      content: "Building with TypeORM and JWT.",
      author: { id: 3, email: "bob@example.com" },
    },
  ]);
});

// POST /posts (protected)
router.post("/", authMiddleware, (req, res) => {
  const { title, content } = req.body;
  res.status(201).json({
    id: Date.now(),
    title,
    content,
    author: { id: (req as any).user?.id || 99, email: (req as any).user?.email || "newuser@example.com" },
  });
});

export default router;
