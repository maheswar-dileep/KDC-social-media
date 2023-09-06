import mongoose from 'mongoose';

const connection = () => {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/social-media-task').then(() => {
      console.log('db connected');
    });
  } catch (error) {
    console.log(error);
  }
};

export default connection;
