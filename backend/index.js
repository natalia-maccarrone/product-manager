const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("Server is Listening on PORT:", PORT);
  });
}

let mockDb = [
  { id: 1, name: "Fries", available: true },
  { id: 2, name: "Big Mac", available: true },
  { id: 3, name: "Drink", available: false },
  { id: 4, name: "6 pc. McNuggets", available: true },
  { id: 5, name: "12 pc. McNuggets", available: false },
  { id: 6, name: "(New) Cheeseburger", available: false },
  { id: 7, name: "Sundae", available: true },
];

app.get("/products", (req, res) => {
  try {
    let filteredProducts = mockDb;

    if (req.query.available) {
      const available = req.query.available === "true";
      filteredProducts = filteredProducts.filter(
        (product) => product.available === available
      );
    }

    const sortBy = req.query.sortBy || "id";
    const sortDir = req.query.sortDir === "desc" ? -1 : 1;

    filteredProducts = filteredProducts.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      // Convert boolean values to strings for proper sorting
      if (typeof valueA === "boolean") valueA = valueA ? "yes" : "no";
      if (typeof valueB === "boolean") valueB = valueB ? "yes" : "no";

      if (valueA < valueB) return -1 * sortDir;
      if (valueA > valueB) return 1 * sortDir;
      return 0;
    });

    if (req.query.search) {
      // This line below replaces all the dots and parenthesis for their escaped versions, so they are not considered as operators for the regex
      const searchString = req.query.search.replace(/[.()]/g, "\\$&");
      const searchRegex = new RegExp(searchString, "i");
      filteredProducts = filteredProducts.filter((product) =>
        searchRegex.test(product.name)
      );
    }

    res.json(filteredProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `An error occured while getting the products: ${error.message}`,
    });
  }
});

app.post("/products", (req, res) => {
  try {
    const newProduct = {
      id: mockDb.length + 1,
      name: req.body.name,
      available: req.body.available || true,
    };
    mockDb.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `An error occured while adding the product: ${error.message}`,
    });
  }
});

app.put("/products/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = mockDb.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name !== undefined ? req.body.name : product.name;
    product.available =
      req.body.available !== undefined ? req.body.available : product.available;

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `An error occured while updating the product: ${error.message}`,
    });
  }
});

app.delete("/products/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = mockDb.find((product) => product.id === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.available) {
      return res
        .status(400)
        .json({ message: "Available products cannot be deleted" });
    }

    mockDb = mockDb.filter((p) => p.id !== productId);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `An error occurred while deleting the product: ${error.message}`,
    });
  }
});

module.exports = app;
