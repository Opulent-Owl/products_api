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
    console.log(sql);
    const output = await pool.query(sql);
    res.json(output.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//GET product info: /products/:product_id
app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const features = [];
    const prodsql = `SELECT * FROM products WHERE id = ${id}`;
    const featsql = `SELECT feature, value FROM features WHERE products_id=${id}`;
    const hold = await pool.query(featsql);
    hold.rows.forEach((feature) => {
      features.push(feature);
    });
    const output = await pool.query(prodsql);
    output.rows[0].features = features;
    console.log(output.rows);
    res.json(output.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//GET product styles: /products/:product_id/styles
app.get("./products/:id/styles", async (req, res) => {
  try {
    const id = req.params.id;
    const styles = await pool.query(
      `SELECT distinct FROM products WHERE id=${id}`,
      [req.params.id]
    );
    const features = await pool.query(
      "SELECT * FROM features WHERE products_id=?",
      [req.params.id]
    );
    product["features"] = features;
    res.json(product);
  } catch {
    console.error(err.message);
  }
});

//GET related products: /products/:product_id/related

app.listen(3000, () => console.log("Server running on port 3000"));
