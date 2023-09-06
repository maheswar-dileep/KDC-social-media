import Joi from 'Joi';

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().required(),
  password: Joi.string().min(4).required(),
});

const signupValidation = (payload) => {
  const data = signupSchema.validate(payload, { abortEarly: false });
  return { value: data?.value, error: data?.error };
};

export default signupValidation;
