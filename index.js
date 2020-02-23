const express = require("express");
const PrismaClient = require("@prisma/client").PrismaClient;
const path = require("path");

const app = express();
const port = 3000;
const prisma = new PrismaClient();

//   const user1 = await prisma.reminder.create({
//     data: {
//       name: "test"
//     }
//   });

app.get("/reminder/:reminderName", (req, res) => {
  prisma.connect();
  const name = req.params.reminder_name;
  let reminder = prisma.reminder.findOne({ where: { name } });
  if (!reminder) {
    reminder = prisma.reminder.create({ data: { name } });
  }
  res.json(reminder);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
