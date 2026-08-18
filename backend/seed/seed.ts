import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import bcrypt from "bcryptjs";

async function main() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const postRepo = AppDataSource.getRepository(Post);

  // Seed users
  const users = [
    { email: "test@example.com", name: "Test User", password: await bcrypt.hash("password123", 10) },
    { email: "leonard@example.com", name: "Leonard", password: await bcrypt.hash("password123", 10) },
    { email: "jane@example.com", name: "Jane Doe", password: await bcrypt.hash("password123", 10) },
    { email: "john@example.com", name: "John Smith", password: await bcrypt.hash("password123", 10) },
    { email: "admin@example.com", name: "Admin User", password: await bcrypt.hash("adminpass", 10) },
  ];

  const savedUsers = await userRepo.save(users);

  // Seed posts (attach to first user)
  const posts = [
    { title: "Welcome Post", content: "This is the first seeded post!", author: savedUsers[0] },
    { title: "Hello World", content: "Testing TypeORM seeding with demo data.", author: savedUsers[1] },
  ];

  await postRepo.save(posts);

  console.log("✅ Seed data inserted");
  await AppDataSource.destroy();
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
});
