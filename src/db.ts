import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.error("Database connection error:", e));

export default prisma;
