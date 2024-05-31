const Blog = require("../models/blog.model");
const express = require("express");
const router = express.Router();
// Blog routes

router.get("/", (req, res) => {
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
router.post("/", async (req, res) => {
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
router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// go to blog details page by id
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render("details", { blog: blog, title: "Blog Details" });
  } catch (err) {
    console.log(err);
  }
});

// delete blog by id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;