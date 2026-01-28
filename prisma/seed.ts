import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: "Ramiro", email: "ramiro@example.com" },
    { name: "Laura", email: "laura@example.com" },
    { name: "Carlos", email: "carlos@example.com" },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("✅ Seed completed");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());