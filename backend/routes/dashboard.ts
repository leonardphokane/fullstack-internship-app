import { Router } from "express";

const router = Router();

// GET /dashboard
router.get("/", (req, res) => {
  res.json({
    title: "Dashboard",
    description: "Overview of your full-stack progress.",
    stats: {
      projects: 3,
      posts: 12,
      profileComplete: true,
    },
  });
});

export default router;
