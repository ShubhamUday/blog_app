const BlogModel = require("../models/blogModel");

const addBlog = async (req, res) => {
  try {
    const newBlog = new BlogModel(req.body);
    await newBlog.save();
    res.send({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const blogs = await BlogModel.find()
      .populate("user", "name") // Only get user name
      .sort({ createdAt: -1 }) // Optional: latest first
      .skip(skip)
      .limit(limit);

    const total = await BlogModel.countDocuments();

    res.send({
      success: true,
      message: "Blog's fetched successfully",
      data: blogs,
      total,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    await BlogModel.findByIdAndUpdate(req.body.blogId, req.body);
    res.send({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.body.blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await BlogModel.findByIdAndDelete(req.body.blogId);
    res.send({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getAllBlogsByUser = async (req, res) => {
  try {
    const allBlog = await BlogModel.find({ user: req.body.user });
    res.send({
      success: true,
      message: "All Blog's by user fetched successfully",
      data: allBlog,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id).populate("user");
    // console.log("getBlogById", blog);
    res.send({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getAllBlogsByUser,
  getBlogById,
};
