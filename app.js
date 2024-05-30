const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB", err.message));

// Register view engine ejs
app.set("view engine", "ejs");
// app.set('views', 'html');

// Middleware & static files
app.use(express.static("public")); // we can access the public folder from the browser

// Home route
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});

// About route
app.get("/about", (req, res) => {
  // res.sendFile("./html/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page

app.use((req, res) => {
  // res.status(404).sendFile("./html/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
