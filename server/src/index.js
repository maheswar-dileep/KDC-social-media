import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import connection from './utils/db.config.js';
import authRouter from './router/auth.routes.js';
import postRouter from './router/posts.routes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);

app.use((req, res) => {
  res.send('not found');
});

connection();

app.listen(8801, () => {
  console.log('Server Started on http://localhost:8801');
});
