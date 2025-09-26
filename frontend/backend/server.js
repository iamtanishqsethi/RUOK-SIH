const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/reddit-clone';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
