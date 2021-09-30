const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database.js');

app.use(cors());
app.use(express.json());

//ROUTES

//GET all products: /products
app.get('/products', async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products LIMIT 5");
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//GET product info: /products/:product_id
app.get('./products/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const product = await pool.query("SELECT * FROM products WHERE id=?", [req.params.id]);
    const features = await pool.query("SELECT * FROM features WHERE products_id=?", [req.params.id]);
    product['features'] = features;
    res.json(product);
  } catch {
    console.error(err.message);
  }
});

//GET product styles: /products/:product_id/styles

//GET related products: /products/:product_id/related

app.listen(3000, () => console.log('Server running on port 3000'));