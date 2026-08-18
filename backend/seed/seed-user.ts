import { AppDataSource } from "../src/data-source";
import { User } from "../src/entities/User";
import bcrypt from "bcryptjs";

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  // Cleanup old record
  await userRepo.delete({ email: "leonard4@example.com" });

  // Hash password
  const hashedPassword = await bcrypt.hash("mypassword", 10);

  // Insert fresh user
  const user = userRepo.create({
    email: "leonard4@example.com",
    password: hashedPassword,
    name: "Leonard Phokane",
  });

  await userRepo.save(user);

  console.log("✅ User seeded:", user.email);
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
});
