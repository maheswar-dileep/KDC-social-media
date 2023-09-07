import { object, string } from 'yup';

let signupValidation = object({
  email: string().email().required(),
  password: string().min(4).required(),
});

export default signupValidation;
