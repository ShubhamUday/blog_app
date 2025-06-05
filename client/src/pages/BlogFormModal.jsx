import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { addBlog, updateBlog } from "../apicalls/blogs";

function BlogFormModal({
  isModalOpen,
  setIsModalOpen,
  formType,
  selectedBlog,
  setSelectedBlog,
  getData,
}) {
  const { user } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    let response = null;
    console.log("value", values);
    try {
      if (formType === "add") {
        values.user = user._id;
        response = await addBlog(values);
      } else {
        response = await updateBlog({
          ...values,
          blogId: selectedBlog._id,
        });
      }
      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(response.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <>
      <Modal
        className="custom-modal"
        centered
        title={formType === "add" ? "Add Blog" : "Edit Blog"}
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <Form
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          style={{ width: "100%" }}
          initialValues={selectedBlog}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                htmlFor="title"
                name="title"
                rules={[{ required: true }]}
              >
                <Input id="title" type="text" placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                htmlFor="content"
                name="content"
                rules={[{ required: true }]}
              >
                <TextArea id="content" placeholder="Content" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button block onClick={handleCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default BlogFormModal;
