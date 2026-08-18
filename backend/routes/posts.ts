import { Router } from "express";

const router = Router();

// GET /posts
router.get("/", (req, res) => {
  res.json([
    { id: 1, title: "First Post", content: "Sharing my engineering insights." },
    { id: 2, title: "Second Post", content: "Building with TypeORM and JWT." },
  ]);
});

// POST /posts
router.post("/", (req, res) => {
  const { title, content } = req.body;
  res.status(201).json({ id: Date.now(), title, content });
});

export default router;
