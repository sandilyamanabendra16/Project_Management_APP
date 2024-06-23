const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env=require('dotenv');
const port=4000;
const cors=require("cors");
env.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Middleware
app.use(bodyParser.json());

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/tasks', require('./routes/tasks'));

//Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port,()=>{
    console.log(`Server running at ${port}`)
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to DB`))
  .catch(err => console.error(err));
