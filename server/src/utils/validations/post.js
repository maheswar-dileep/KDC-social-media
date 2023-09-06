import Joi from 'Joi';

const postSchema = Joi.object({
  title: Joi.string().min(3).max(15).required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  authorId: Joi.string().required(),
});

const postValidation = (payload) => {
  const data = postSchema.validate(payload, { abortEarly: false });
  return { value: data?.value, error: data?.error };
};

export default postValidation;
