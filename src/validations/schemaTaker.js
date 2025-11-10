const { z } = require('zod');

const tokenSchema = z
  .string({ required_error: 'Token não encontrado' })
  .nonempty({ message: 'Token não encontrado' })
  .length(16, { message: 'Token inválido' });

const talkerSchema = z.object({
  name: z
    .string({ required_error: 'O campo "name" é obrigatório' })
    .nonempty({ message: 'O campo "name" é obrigatório' })
    .min(3, { message: 'O "name" deve ter pelo menos 3 caracteres' }),

  age: z
    .number({ required_error: 'O campo "age" é obrigatório' })
    .int({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' })
    .min(18, { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' }),

  talk: z
    .object({
      watchedAt: z
        .string({ required_error: 'O campo "watchedAt" é obrigatório' })
        .nonempty({ message: 'O campo "watchedAt" é obrigatório' })
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
          message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        }),
      rate: z
        .number({ required_error: 'O campo "rate" é obrigatório' })
        .int({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' })
        .min(1, { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' })
        .max(5, { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' }),
    }, { required_error: 'O campo "talk" é obrigatório' }),
});

module.exports = { talkerSchema, tokenSchema };