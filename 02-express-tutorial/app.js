//Import require module
const express = require("express");
const { products, people } = require("./data");
const cookieParser = require("cookie-parser");

const peopleRouter = require("./routes/people");

//Initialize the Express Application
const app = express();

// Logger middleware
const logger = (req, res, next) => {
  const currTime = new Date().toLocaleString();
  // Log method, URL, and time
  console.log(`${currTime}: ${req.method} ${req.url}`);
  next();
};

// Middleware
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/people", peopleRouter);
app.use(cookieParser());
//This middleware serves static files from the ./public directory
//app.use(express.static("./public"));
app.use(express.static("./methods-public"));
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

//Auth middleware
const auth = (req, res, next) => {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    // Do not call next(); return the 401 response here
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Route to handle logon
app.post("/logon", (req, res) => {
  if (req.body.name) {
    res.cookie("name", req.body.name);
    res
      .status(201)
      .json({ message: `Hello, ${req.body.name}! You are now logged in.` });
  } else {
    res.status(400).json({ message: "Name is required to log on." });
  }
});

// Route to handle logoff
app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ message: "You are now logged off." });
});

// Route to test the user's authentication
app.get("/testauth", auth, (req, res) => {
  res.status(200).json({ message: `Hello, ${req.user}` });
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
