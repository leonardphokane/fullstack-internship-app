import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      title: "My First Post",
      content: "This is my personal post.",
      author: { id: 1, email: "me@example.com" },
    },
    {
      id: 2,
      title: "Another Post",
      content: "More insights from me.",
      author: { id: 1, email: "me@example.com" },
    },
  ]);
});

export default router;
