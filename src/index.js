const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || "3001";

const readDataFile = () => {
  const data = fs.readFileSync("src/talker.json", "utf8");

  return JSON.parse(data);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get("/talker", (req, res) => {
  try {
    const data = readDataFile();

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/talker/:id", (req, res) => {
  const { id } = req.params;

  try {
    const data = readDataFile();

    const filteredPerson = data.find((person) => person.id === Number(id));
    if (filteredPerson) {
      return res.status(200).json(filteredPerson);
    }
    res.status(404).json({ message: "Pessoa palestrante não encontrada" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log("Online");
});
