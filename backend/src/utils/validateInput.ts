 import Joi from 'joi';

export const validateUrlParams = (data: any) => {
  const schema = Joi.object({
    url: Joi.string().uri().required(),
    parameters: Joi.object().pattern(Joi.string(), Joi.string()).required(),
  });
   return schema.validate(data);
};
