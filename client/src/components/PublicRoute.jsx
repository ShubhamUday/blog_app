import { HomeOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    user
      ? {
          key: "profile",
          label: user.name,
          icon: <UserOutlined />,
          onClick: () => navigate("/blogs-by-user"),
        }
      : {
          key: "login",
          label: "Login",
          icon: <LoginOutlined />,
          onClick: () => navigate("/login"),
        },
  ];

  return (
    <>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <h3
            className="demo-logo text-black m-0 cursor-pointer"
            style={{ color: "black" }}
            onClick={() => navigate("/")}
          >
            Blog App
          </h3>
          <Menu theme="light" mode="horizontal" items={navItems} />
        </Header>
        <div style={{ padding: 0, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
    </>
  );
}

export default PublicRoute;
