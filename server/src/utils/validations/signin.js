import Joi from 'Joi';

const signinSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(4).required(),
});

const signinValidaiton = (payload) => {
  const data = signinSchema.validate(payload, { abortEarly: false });
  return { value: data?.value, error: data?.error };
};

export default signinValidaiton;
