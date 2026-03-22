// ecommerce-backend/server.js
// Import required packages
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import product data from the data folder
const products = require("./data/products");

// Create an Express application
const app = express();

// Enable CORS so React can access this backend
app.use(cors());
app.use(express.json());

// (Optional) Serve static images from ./public/images
// Put your image files under ecommerce-backend/public/images
app.use("/images", express.static(path.join(__dirname, "public/images")));

/*
  API Endpoint: GET /api/products
  Purpose: Return all products as JSON
*/
app.get("/api/products", (req, res) => {
  res.json(products);
});

/*
  API Endpoint: GET /api/products/:id
  Purpose: Return one product by id (required by SingleProduct.jsx)
*/
app.get("/api/products/:id", (req, res) => {
  const id = String(req.params.id);
  const item = products.find((p) => String(p.id) === id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

/*
  API Endpoint: GET /api/categories
  Purpose: Return unique category names for the Sidebar
*/
app.get("/api/categories", (req, res) => {
  const unique = [...new Set(products.map((p) => p.category).filter(Boolean))];
  res.json(unique);
});

/*
  API Endpoint: GET /api/category?id=<name>
  Purpose: Return products for one category (kept for convenience)
*/
app.get("/api/category", (req, res) => {
  const categoryId = (req.query.id || "").toLowerCase();
  const filtered = products.filter(
    (p) => (p.category || "").toLowerCase() === categoryId
  );
  res.json(filtered);
});

/*
  Root Route: simple health check
*/
app.get("/", (req, res) => {
  res.send("E-Commerce Product API is running...");
});

// Start server on port 5000
app.listen(5000, () => {
  console.log("Backend server running at http://localhost:5000");
});