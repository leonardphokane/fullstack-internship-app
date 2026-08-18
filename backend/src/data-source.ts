import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import dotenv from "dotenv";

dotenv.config(); // load .env

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined. Check your .env file.");
}

console.log("Connecting with:", process.env.DATABASE_URL); // 👈 log once

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User, Post],
  ssl: {
    rejectUnauthorized: false, // 👈 accept self-signed cert
  },
});

