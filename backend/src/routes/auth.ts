import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const router = Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ email, password: hashed, name });
  await userRepo.save(user);
  res.json(user);
});

// Login (with debug logs)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🔑 Login attempt:", { email, password }); // log incoming request

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email } });

  if (!user) {
    console.log("❌ No user found for email:", email);
    return res.status(400).json({ message: "Invalid credentials" });
  }

  console.log("📦 Found user:", user);

  try {
    const match = await bcrypt.compare(password, user.password);
    console.log("🔍 Comparing:", password, "with hash:", user.password, "=>", match);

    if (!match) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    console.log("✅ Login successful, issuing token");
    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("⚠️ Error during bcrypt.compare:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
