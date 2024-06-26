const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
// Blog routes

router.get("/", blogController.blog_index);

// Create a new blog
router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

// go to blog details page by id
router.get("/:id", blogController.blog_details);

// delete blog by id
router.delete("/:id", blogController.blog_delete);

module.exports = router;
