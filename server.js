const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

const authRouter = require('./src/routes/authRoutes');
const userRouter = require('./src/routes/userRoutes');
const categoryRouter = require('./src/routes/categoryRoutes');
const bookRouter = require('./src/routes/bookRoutes');
const bookmarkRouter = require('./src/routes/bookmarkRoutes');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/uploads', express.static('uploads'));
app.use('/api/v1/userUploads', express.static('userUploads'));
app.use('/api/v1/userEpubs', express.static('userEpubs'));
app.use('/public', express.static('public'));

app.use('/api/v1', userRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', bookRouter);
app.use('/api/v1', bookmarkRouter);
app.use('/api/v1', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running in port ${PORT}`);
});
