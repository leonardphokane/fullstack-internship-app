import { PrismaClient } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.createMany({
    data: [
      { email: "test@example.com", name: "Test User" },
      { email: "leonard@example.com", name: "Leonard" },
      { email: "jane@example.com", name: "Jane Doe" },
      { email: "john@example.com", name: "John Smith" },
      { email: "admin@example.com", name: "Admin User" },
    ],
  });
}

main()
  .then(() => console.log("✅ Seed data inserted"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
