const mongoose = require('mongoose');
const env = require('dotenv');
const colors = require('colors');

env.config({path: './config/config.env'});

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });

  console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline)
};

module.exports = connectDB;
