import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { handleNotFound, handleError } from './middlewares/errorHandlerMiddleware.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);

app.use(handleNotFound);
app.use(handleError);

app.listen(PORT, console.log(`Server is running on port ${PORT} ${ENV}`));
