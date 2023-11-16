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

console.log("hello");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('./../front')); // Serve static files from the 'front' folder

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Your other routes...

app.get('/api/data', (req, res) => {
  // Process your data logic here
  res.json({ message: 'Hello from the backend!' });
});
