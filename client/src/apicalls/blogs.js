import { axiosInstance } from "./index";

export const addBlog = async (payload) => {
  try {
    const response = await axiosInstance.post("/blog/add-blog", payload);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateBlog = async (payload) => {
  try {
    const response = await axiosInstance.put("/blog/update-blog", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const deleteBlog = async (payload) => {
  try {
    // console.log(payload.blogId);
    const response = await axiosInstance.delete("/blog/delete-blog", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getAllBlogsByUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/blog/get-all-blogs-by-user",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getAllBlogs = async (page, limit = 6) => {
  try {
    const response = await axiosInstance.get(
      `/blog/get-all-blogs?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(`/blog/get-blog-by-id/${id}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};
