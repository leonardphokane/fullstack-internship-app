const { defineConfig } = require("@prisma/config");
require("dotenv").config(); // 👈 ensures .env is loaded

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    db: {
      provider: "postgresql",
      adapter: {
        url: process.env.DATABASE_URL,
      },
    },
  },
});
