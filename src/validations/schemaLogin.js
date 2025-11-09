const { z } = require('zod');

const loginSchema = z.object({
  email: z
    .string({ error: 'O campo "email" é obrigatório' })
    .min(1, { error: 'O campo "email" é obrigatório' })
    .email({ error: 'O "email" deve ter o formato "email@email.com"' }),
  password: z
    .string({ error: 'O campo "password" é obrigatório' })
    .min(1, { error: 'O campo "password" é obrigatório' })
    .min(6, { error: 'O "password" deve ter pelo menos 6 caracteres' }),
});

module.exports = loginSchema;