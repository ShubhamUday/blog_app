import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { getCurrentUser } from "../apicalls/users";
import { Layout, Menu, message } from "antd";
import { Header } from "antd/es/layout/layout";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  // console.log("StateUser", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    {
      label: (
        <Link
          to="/"
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(setUser(null));
            navigate("/");
          }}
        >
          Logout
        </Link>
      ),
      icon: <LogoutOutlined />,
      key: "logout",
    },
  ];

  const getValidUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        dispatch(setUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(setUser(null));
      localStorage.removeItem("token");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
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
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
