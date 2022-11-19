const products = require('./data/products');
const express = require('express');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === Number.parseInt(req.params.id));
  res.json(product);
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
