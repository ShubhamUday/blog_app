import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Flex, FloatButton, message } from "antd";
import { getAllBlogsByUser } from "../apicalls/blogs";
import BlogFormModal from "./BlogFormModal";
import DeleteBlogModal from "./DeleteBlogModal";

const BlogByUser = () => {
  const { user } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState(null);
  const [formType, setFormType] = useState("add");
  const [selectedBlog, setSelectedBlog] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getData = async () => {
    try {
      const response = await getAllBlogsByUser({ user: user._id });

      if (response.success) {
        const allBlogs = response.data;
        setBlogs(
          allBlogs.map(function (item) {
            return { ...item, key: `blog${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleEdit = (blog) => {
    setFormType("edit");
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FloatButton
        trigger="click"
        style={{ insetInlineEnd: 40 }}
        icon={<PlusOutlined />}
        tooltip={{
          title: "Add Todo",
          color: "blue",
          placement: "top",
        }}
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      />

      <Flex gap="middle" align="start" vertical>
        {blogs &&
          blogs.map((data, index) => (
            <div
              key={data._id || index}
              style={{ width: "100%", maxWidth: "100%", marginBottom: 16 }}
            >
              <Card
                key={index}
                size="small"
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      handleEdit(data);
                    }}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedBlog(data);
                    }}
                  />,
                ]}
              >
                <Card.Meta
                  title={data.title}
                  description={<p>{data.content}</p>}
                />
              </Card>
            </div>
          ))}
      </Flex>

      {isModalOpen && (
        <BlogFormModal
          isModalOpen={isModalOpen}
          selectedBlog={selectedBlog}
          setSelectedBlog={setSelectedBlog}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteBlogModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedBlog={selectedBlog}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedBlog={setSelectedBlog}
          getData={getData}
        />
      )}
    </>
  );
};

export default BlogByUser;
