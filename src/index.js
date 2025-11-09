const express = require('express');
const fs = require('fs');
const loginSchema = require('./validations/schemaLogin');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const readDataFile = () => {
  const data = fs.readFileSync('src/talker.json', 'utf8');

  return JSON.parse(data);
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
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

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;

  try {
    const data = readDataFile();

    const filteredPerson = data.find((person) => person.id === Number(id));
    if (filteredPerson) {
      return res.status(200).json(filteredPerson);
    }
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    console.log(err);
  }
});

const validateLogin = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    const { message } = result.error.issues[0];
    return res.status(400).json({ message });
  }
  next();
};

const generateToken = () => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const token = Array.from({ length: 16 }, () => {
    const index = Math.floor(Math.random() * CHARS.length);
    return CHARS[index];
  }).join('');
  return token;
};

app.post('/login', validateLogin, (req, res) => {
  const { email, password } = req.body;
  const token = generateToken();

  try {
    if (email && password) {
      console.log(token);
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: 'Email ou password incorretos.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erro ao na execução' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
