const express = require('express');
const fs = require('fs');
const loginSchema = require('./validations/schemaLogin');
const { talkerSchema, tokenSchema } = require('./validations/schemaTaker');

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
  req.body = result.data;
  return next();
};

const validateTalker = (req, res, next) => {
  const { age } = req.body;

  if (age !== undefined && typeof age !== 'number') {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }

  const result = talkerSchema.safeParse(req.body);
  if (!result.success) {
    const { message } = result.error.issues[0];
    return res.status(400).json({ message });
  }

  req.body = result.data;
  return next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const result = tokenSchema.safeParse(authorization);

  if (!result.success) {
    const { message } = result.error.issues[0];
    return res.status(401).json({ message });
  }

  return next();
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
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: 'Email ou password incorretos.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Erro ao na execução' });
  }
});

app.post('/talker', validateToken, validateTalker, (req, res) => {
  try {
    const dataTalkers = readDataFile();
    const nextId = dataTalkers.length > 0
      ? Math.max(...dataTalkers.map(({ id }) => id)) + 1
      : 1;
    const newTalker = { id: nextId, ...req.body };
    const updatedList = [...dataTalkers, newTalker];

    fs.writeFileSync('src/talker.json', JSON.stringify(updatedList, null, 2));

    return res.status(201).json(newTalker);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erro ao cadastrar palestrante' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
