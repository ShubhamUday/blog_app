import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { getBlogById } from "../apicalls/blogs";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await getBlogById(id);
      setBlog(response.data);
    };
    fetchBlog();
  }, [id]);

  if (!blog) return null;

  return (
    <div>
      <Typography.Title>{blog.title}</Typography.Title>
      <Typography.Paragraph>{blog.content}</Typography.Paragraph>
    </div>
  );
};

export default BlogDetail;
