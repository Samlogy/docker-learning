const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {}

const dbPrisma = main()
  .then(() => console.log("DB Connected !"))
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = dbPrisma;
