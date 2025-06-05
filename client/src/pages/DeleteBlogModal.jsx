import { message, Modal } from "antd";
import { deleteBlog } from "../apicalls/blogs";

const DeleteBlogModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedBlog,
  setSelectedBlog,
  getData,
}) => {
  const handleOk = async () => {
    try {
      const blogId = selectedBlog._id;
      const response = await deleteBlog({ data: { blogId } });

      // console.log(blogId, response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        setSelectedBlog(null);
      }
      setIsDeleteModalOpen(false);
    } catch (err) {
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
  };
  return (
    <>
      <Modal
        title="Delete Blog?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">Are you sure you want to delete this blog?</p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this blog data.
        </p>
      </Modal>
    </>
  );
};

export default DeleteBlogModal;
