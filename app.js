const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blog.routes");

require("dotenv").config();
const app = express();

// connect to mongodb
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB", err.message));

// Register view engine ejs
app.set("view engine", "ejs");
// app.set('views', 'html');

// Middleware & static files
app.use(express.static("public")); // we can access the public folder from the browser
//  to parse the form data use the following middleware
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  //   redirect to /blogs
  res.redirect("/blogs");
});

// About route
app.get("/about", (req, res) => {
  // res.sendFile("./html/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// Blog routes
app.use("/blogs", blogRoutes);

// 404 page

app.use((req, res) => {
  // res.status(404).sendFile("./html/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
