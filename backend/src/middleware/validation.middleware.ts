import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { 
      stripUnknown: true, // This will remove fields not defined in the schema
      abortEarly: false 
    });
    
    if (error) {
      // Your existing error handling
      return res.status(400).json({
        success: false,
        message: error.details.map(detail => detail.message).join(', ')
      });
    }
    
    req.body = value; // Replace with validated and stripped data
    next();
  };
};
