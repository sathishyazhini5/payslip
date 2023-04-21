const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get the value of mongoUrl from process.env
const dbURL = process.env.dbURL;

// Connect to MongoDB using mongoose.connect()
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
}).then(() => {
  console.log('Mongoose Connected!');
}).catch((err) => {
  console.log(`Error while connecting: ${err}`);
});
