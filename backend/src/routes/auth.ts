import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const router = Router();
const userRepo = AppDataSource.getRepository(User);

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if email already exists
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    const user = userRepo.create({ email, password: hashed, name });
    await userRepo.save(user);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Error in register route:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Login (with debug logs + graceful errors)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🔑 Login attempt:", { email });

  try {
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      console.log("❌ No user found for email:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("📦 Found user:", user);

    const match = await bcrypt.compare(password, user.password);
    console.log("🔍 Comparing password =>", match);

    if (!match) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    console.log("✅ Login successful, issuing token");
    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("⚠️ Error during login:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
