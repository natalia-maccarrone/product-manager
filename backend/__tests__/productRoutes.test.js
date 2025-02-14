const request = require("supertest");
const app = require("../index");

describe("Products API", () => {
  describe("GET /products", () => {
    it("should return all products", async () => {
      const res = await request(app).get("/products");
      expect(res.body.length).toBe(7);
      expect(res.status).toBe(200);
    });

    it("should filter by availability", async () => {
      const res = await request(app).get("/products?available=true");
      expect(res.status).toBe(200);
      expect(res.body.every((product) => product.available)).toBeTruthy();
    });

    it("should sort by specified field", async () => {
      const res = await request(app).get("/products?sortBy=name");
      expect(res.status).toBe(200);
      const isSorted = res.body.every((product, index) => {
        if (index === 0) return true;
        return product.name >= res.body[index - 1].name;
      });
      expect(isSorted).toBeTruthy();
    });

    it("should search products by name", async () => {
      const res = await request(app).get("/products?search=nugget");
      expect(res.status).toBe(200);
      expect(
        res.body.every((product) =>
          product.name.toLowerCase().includes("nugget")
        )
      ).toBeTruthy();
    });

    it("should handle special characters in search", async () => {
      const res = await request(app).get("/products?search=(New)");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toContain("(New)");
    });
  });

  describe("POST /products", () => {
    it("should create a new product", async () => {
      const newProduct = {
        name: "Test Product",
        available: true,
      };
      const res = await request(app).post("/products").send(newProduct);

      expect(res.status).toBe(201);
      expect(res.body.name).toBe(newProduct.name);
      expect(res.body.available).toBe(newProduct.available);
      expect(res.body).toHaveProperty("id");
    });

    it("should set available to true by default", async () => {
      const res = await request(app)
        .post("/products")
        .send({ name: "Test Product" });

      expect(res.status).toBe(201);
      expect(res.body.available).toBe(true);
    });
  });

  describe("PUT /products/:id", () => {
    it("should update an existing product", async () => {
      const update = {
        name: "Updated Product",
        available: false,
      };
      const res = await request(app).put("/products/1").send(update);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(update.name);
      expect(res.body.available).toBe(update.available);
    });

    it("should return 404 for non-existent product", async () => {
      const res = await request(app)
        .put("/products/999")
        .send({ name: "Test" });

      expect(res.status).toBe(404);
    });

    it("should only update provided fields", async () => {
      const product = {
        name: "Original Name",
        available: true,
      };
      const createRes = await request(app).post("/products").send(product);

      const res = await request(app)
        .put(`/products/${createRes.body.id}`)
        .send({ name: "Partial Update" });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Partial Update");
      expect(res.body.available).toBe(true);
    });

    afterEach(async () => {
      await request(app).put("/products/1").send({ name: 'Fries', available: true });
    })
  });

  describe("DELETE /products/:id", () => {
    it('should delete unavailable product', async () => {
      const product = {
        name: 'To Delete',
        available: false
      };

      const createRes = await request(app)
        .post('/products')
        .send(product);

      await request(app)
        .put(`/products/${createRes.body.id}`)
        .send({...product, available: false});

      const res = await request(app).delete(`/products/${createRes.body.id}`);
      expect(res.status).toBe(204);
    });

    it("should not delete available product", async () => {
      const res = await request(app).delete("/products/1");
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Available products cannot be deleted");
    });

    it('should return 404 for non-existent product', async () => {
      const res = await request(app).delete('/products/999');
      expect(res.status).toBe(404);
    });
  });
});
