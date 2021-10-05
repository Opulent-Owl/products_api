const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database.js");

app.use(cors());
app.use(express.json());

//ROUTES

//GET list products: /products/list
app.get("/products/list", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 5;
    const start = (page - 1) * count;
    const end = parseInt(start) + parseInt(count);
    const sql = `SELECT * FROM products WHERE id > ${start} AND id <= ${end}`;
    const output = await pool.query(sql);
    res.send(output.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//GET product info: /products/:product_id
app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `
    SELECT JSON_BUILD_OBJECT(
      'id', id,
      'name', name,
      'slogan', slogan,
      'description', description,
      'category', category,
      'default_price', default_price,
      'features', (
        SELECT JSON_AGG(
          JSON_BUILD_OBJECT(
          'feature', feature,
          'value', value
          )
        )
        FROM features WHERE products_id=${id}
      )
    )
    FROM products
    WHERE id=${id}
    `;
    const output = await pool.query(sql);
    res.json(output.rows[0].json_build_object);
  } catch (err) {
    console.error(err.message);
  }
});

//GET product styles: /products/:product_id/styles
app.get("/products/:id/styles", async (req, res) => {
  try {
    const id = req.params.id;
    const output = {
      product_id: id,
      results: [],
    };
    const sql = `
    SELECT JSON_BUILD_OBJECT(
      'id', styles.id,
      'name', styles.name,
      'sale_price', styles.sale_price,
      'original_price', styles.original_price,
      'default?', styles.default_style,
      'photos', (
        SELECT JSON_AGG(
          JSON_BUILD_OBJECT(
            'url', photos.url,
            'thumbnail_url', photos.thumbnail_url
          ))
          FROM photos
          WHERE photos.styles_id = styles.id
        ),
      'skus', (
        SELECT JSON_OBJECT_AGG(skus.id,
          JSON_BUILD_OBJECT(
            'size', skus.size,
            'quantity', skus.quantity
          )
        )
        FROM skus
          WHERE skus.styles_id = styles.id
      )
    )
    FROM styles
    WHERE styles.products_id = ${id}
    GROUP BY styles.id;
    `;
    const results = await pool.query(sql);
    results.rows.forEach((result) => {
      output.results.push(result.json_build_object);
    });
    res.json(output);
  } catch (err) {
    console.error(err.message);
  }
});

//GET related products: /products/:product_id/related
app.get("/products/:id/related", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT ARRAY_AGG(related_product_id) FROM related WHERE products_id=${id}`;
    const output = await pool.query(sql);
    res.json(output.rows[0].array_agg);
  } catch (err) {
    console.error(err.message);
  }
});

//POST new product: /products/:product_id
app.post("/products/:id", async (req, res) => {
  try {
    const sql = `
      INSERT INTO products(id, name, slogan, description, category, default_price)
      VALUES (${req.body.name}, ${req.body.slogan}, ${req.body.description}, ${req.body.category}, ${req.body.default_price})
    `;
    await pool.query(sql);
    res.send("Product Added");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = app;
