const express = require("express");
const PrismaClient = require("@prisma/client").PrismaClient;
const path = require("path");
var cors = require("cors");

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(cors());
// app.use(express.static(path.join(__dirname, "dist")));
app.get("/:params", function(req, res) {
  express.static(path.join(__dirname, "dist"));
});

app.get("/reminder/:reminderName", cors(), async (req, res) => {
  prisma.connect();
  const name = req.params.reminderName;
  let reminder;
  try {
    reminder = await prisma.reminder.findMany({
      where: { name: name }
    });
  } catch (e) {
    console.error(e);
  }
  if (reminder[0]) {
    try {
      reminder = await prisma.reminder.create({ data: { name } });
    } catch (e) {
      console.error(e);
    }
  }
  return res.json(JSON.stringify(reminder));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
