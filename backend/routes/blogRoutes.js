const express = require("express");
const {
  addBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getAllBlogsByUser,
  getBlogById,
} = require("../controllers/BlogController");
const BlogRouter = express.Router();

BlogRouter.post("/add-blog", addBlog);
BlogRouter.get("/get-all-blogs", getAllBlogs);
BlogRouter.put("/update-blog", updateBlog);
BlogRouter.delete("/delete-blog", deleteBlog);
BlogRouter.post("/get-all-blogs-by-user", getAllBlogsByUser);
BlogRouter.get("/get-blog-by-id/:id", getBlogById);

module.exports = BlogRouter;
