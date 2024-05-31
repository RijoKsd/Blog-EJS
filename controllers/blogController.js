const Blog = require("../models/blog.model");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render("details", { blog: blog, title: "Blog Details" });
  } catch (err) {
    console.log(err);
  }
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create a new blog" });
};

const blog_create_post = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.redirect("/blogs");
  } catch (err) {
    console.log(err);
  }
};

const blog_delete = async (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
