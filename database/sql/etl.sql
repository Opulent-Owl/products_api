COPY products
FROM '/home/freehodler/code/hackreactor/atelierAPI/csvs/product.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY related
FROM '/home/freehodler/code/hackreactor/atelierAPI/csvs/related.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY features
FROM '/home/freehodler/code/hackreactor/atelierAPI/csvs/features.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY styles
FROM '/home/freehodler/code/hackreactor/atelierAPI/csvs/styles.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY skus
FROM '/home/freehodler/code/hackreactor/atelierAPI/csvs/skus.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');

COPY photos
FROM '/home/freehodler/code/hackreactor/atelierAPI/csvs/photos.csv'
WITH (FORMAT CSV, HEADER true, NULL 'null');