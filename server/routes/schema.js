import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().alphanum().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const createCommentSchema = Joi.object({
  body: Joi.string().required()
});

export const addReplySchema = Joi.object({
  reply: Joi.string().required(),
});
