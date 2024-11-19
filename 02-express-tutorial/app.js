//Import require module
const express = require("express");
const { products } = require("./data");

//Initialize the Express Application
const app = express();

//This middleware serves static files from the ./public directory
app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  //Sends the full list of products as a JSON response
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  // Access the productID from req.params
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

//Fetch filtered and/or limited products based on query parameters.
app.get("/api/v1/query", (req, res) => {
  let filteredProducts = [...products];
  const search = req.query.search;
  const limit = req.query.limit;
  const price = req.query.price;

  if (search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }
  if (price) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= parseInt(price)
    );
  }

  if (filteredProducts.length < 1) {
    return res.status(200).json({ sucess: true, data: [] });
  }

  // Respond with the filtered and limited list of products
  res.status(200).json(filteredProducts);
});

app.get("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
