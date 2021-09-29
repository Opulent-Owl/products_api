USE atelier_products;
/* Relation 'products_styles' */
ALTER TABLE styles
  ADD CONSTRAINT products_styles
    FOREIGN KEY (products_id) REFERENCES products (id);

/* Relation 'styles_styles' */
ALTER TABLE skus
  ADD CONSTRAINT styles_styles FOREIGN KEY (styles_id) REFERENCES styles (id);

/* Relation 'styles_table1' */
ALTER TABLE photos
  ADD CONSTRAINT styles_table1 FOREIGN KEY (styles_id) REFERENCES styles (id);

/* Relation 'products_related' */
ALTER TABLE related
  ADD CONSTRAINT products_related
    FOREIGN KEY (products_id) REFERENCES products (id);

/* Relation 'products_features' */
ALTER TABLE features
  ADD CONSTRAINT products_features
    FOREIGN KEY (products_id) REFERENCES products (id);