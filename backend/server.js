import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);

app.listen(PORT, console.log(`Server is running on port ${PORT} ${ENV}`));
