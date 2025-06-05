import { Layout, Card, Row, Col, Typography, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../apicalls/blogs";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PublicBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs(page);
      setBlogs(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <>
      <Layout style={{ backgroundColor: "#fff" }}>
        <Content>
          <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
            Explore Latest Blogs
          </Title>

          <Row gutter={[16, 16]}>
            {blogs.map((blog) => (
              <Col key={blog._id} xs={24} sm={24} md={12} lg={8}>
                <Card
                  title={blog.title}
                  extra={
                    <a onClick={() => navigate(`/blogs/${blog._id}`)}>
                      Read More
                    </a>
                  }
                  style={{ height: "100%" }}
                >
                  <Paragraph ellipsis={{ rows: 4 }}>
                    {blog.content || "No content"}
                  </Paragraph>
                  <p>Author :@{blog.user.name}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>

        <Pagination
          align="center"
          current={page}
          pageSize={6}
          total={total}
          onChange={(page) => setPage(page)}
          style={{ marginTop: 16, textAlign: "center" }}
        />
      </Layout>
    </>
  );
};

export default PublicBlogPage;
