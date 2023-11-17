// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(express.json());
// app.use(express.static('front'));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // app.get("/", (req, res) => {
// //   res.status(200).send("hello Node.js! ");
// // });

// app.post("/post/:id", (req, res) => {
//   const { id } = req.params;
//   const { logo } = req.body;

//   if (!logo) {
//     res.status(418).send("We need a logo!");
//   }

//   res.status(200).send(`Hello ${id}, here is your ${logo}!`);
// });

// app.patch("/patch/:id", (req, res) => {
//   const { id } = req.params;
//   const { logo } = req.body;

//   if (!logo) {
//     res.status(418).send("We need a logo!");
//   }

//   res.status(200).send(`Hello ${id}, here is your ${logo}!`);
// });

// app.get('/api/data', (req, res) => {
//   // Process your data logic here
//   res.json({ message: 'Hello from the backend!' });
// });

const Product = require("./models/productModels");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./../front")); // Serve static files from the 'front' folder

mongoose
  .connect(
    "mongodb+srv://kiplangatmike:lecomesigo82@mikeapi.s2vd7nt.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Your other routes...

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

//update an item
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
  } catch {
    res.status(404).json({ message: err.message });
  }
});

//post a product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

//delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Product deleted");
    }
    throw new Error("Product not found");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
