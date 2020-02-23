import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  const user1 = await prisma.reminder.create({
    data: {
      name: "test"
    }
  });
  console.log(user1);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.disconnect();
  });
