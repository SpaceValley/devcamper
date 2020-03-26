const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');

//Route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')

//Connect to the database
connectDB();

//Load env constants
env.config({path: './config/config.env'});

const app = express();

//Boy parser
app.use(express.json());

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

app.use(errorHandler);
app.use(cookieParser);

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

//File upload
app.use(fileupload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT;

const server = app.listen(
    PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.brightYellow.bold)
);

process.on('uncaughtException', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
