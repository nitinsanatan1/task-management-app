import Joi from 'joi';

export const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const taskValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(1000).required(),
  status: Joi.string().valid('pending', 'in-progress', 'completed')
});

export const taskUpdateValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(5).max(1000),
  status: Joi.string().valid('pending', 'in-progress', 'completed')
}).min(1);
