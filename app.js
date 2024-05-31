const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog.model");

require("dotenv").config();
const app = express();

// connect to mongodb
const PORT = process.env.PORT 
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

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a new blog
app.post("/blogs", async (req, res) => {
  //  const blog = new Blog(req.body);
  // blog.save().then((result)=>{
  //   res.redirect('/blogs');
  // }).catch(err=>{
  //   console.log(err)
  // })
  try {
    const blog = new Blog(req.body);
    const result = await blog.save();
    res.redirect("/blogs");
  } catch (err) {
    console.log(err);
  }
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// go to blog details page by id
app.get("/blogs/:id",async (req, res) => {
  console.log(req.params.id, "id")
  try{
  
    const blog = await Blog.findById(req.params.id);
    res.render('details', {blog: blog, title: 'Blog Details'});
  }catch(err){
    console.log(err);
  }
   
  
});

// delete blog by id
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});



// 404 page

app.use((req, res) => {
  // res.status(404).sendFile("./html/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
