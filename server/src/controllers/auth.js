import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.model.js';
import signinValidaiton from '../utils/validations/signin.js';
import signupValidation from '../utils/validations/signup.js';

dotenv.config();

//* --- signup --- *//

export const signup = async (req, res) => {
  try {
    const { error, value } = signupValidation(req.body);
    if (error) return res.status(400).send({ success: true, message: error });

    const userExists = await User.findOne({ email: value.email });
    if (userExists) return res.status(400).send({ success: true, message: 'User Already Exists' });

    const password = await bcrypt.hash(value.password, 10);

    const token = jwt.sign(
      {
        Userinfo: {
          id: value?._id,
          email: value?.email,
        },
      },
      'Secret_Token_Token',
      // process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: '24h',
      }
    );

    const user = new User({
      name: value.name,
      email: value.email,
      password,
    });

    const save = await user.save();

    return res.status(200).send({ success: true, message: 'User Created Successfully', userData: save, token });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* --- signin ---*//

export const signin = async (req, res) => {
  try {
    const { error, value } = signinValidaiton(req.body);
    if (error) return res.status(400).send({ success: true, message: error });

    const userExists = await User.findOne({ email: value.email });
    if (!userExists) return res.status(400).send({ success: true, message: 'User Does Not Exists' });

    const user = await bcrypt.compare(value.password, userExists.password);
    if (!user) return res.status(400).send({ success: true, message: 'Password Does Not match' });

    const token = jwt.sign(
      {
        Userinfo: {
          id: userExists?._id,
          email: userExists?.email,
        },
      },
      'Secret_Token_Token',
      // process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: '24h',
      }
    );

    return res
      .status(200)
      .send({ success: true, message: 'User LoggedIn Successfully', userData: userExists, token });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
