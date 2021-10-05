const { performance } = require("perf_hooks");
const { setUncaughtExceptionCaptureCallback } = require("process");
const request = require("supertest");
const app = require("./app");

const product_id = Math.floor(Math.random() * 1000000);

let server;

beforeEach(async () => {
  server = await app.listen(4000);
});

afterEach(async () => {
  await server.close();
});

describe(`Products API Request Times for Product ID: ${product_id}`, () => {
  test("should return products list request time", async () => {
    var start = performance.now();
    const res = await request(app).get("/products/list");
    var end = performance.now();
    console.log(`Request time for products list: ${end - start} ms`);
    expect(res.statusCode).toEqual(200);
  });

  test("should return product info request time", async () => {
    var str = `/products/${product_id}`;
    var start = performance.now();
    const res = await request(app).get(str);
    var end = performance.now();
    console.log(`Request time for product info: ${end - start} ms`);
    expect(res.statusCode).toEqual(200);
  });

  test("should return product styles request time", async () => {
    var str = `/products/${product_id}/styles`;
    var start = performance.now();
    const res = await request(app).get(str);
    var end = performance.now();
    console.log(`Request time for product styles: ${end - start} ms`);
    expect(res.statusCode).toEqual(200);
  });

  test("should return related products request time", async () => {
    var str = `/products/${product_id}/related`;
    var start = performance.now();
    const res = await request(app).get(str);
    var end = performance.now();
    console.log(`Request time for related products: ${end - start} ms`);
    expect(res.statusCode).toEqual(200);
  });
});
