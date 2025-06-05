import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogByUser from "./pages/BlogByUser";
import BlogDetail from "./pages/BlogDetail";
import PublicBlogPage from "./pages/PublicBlogPage";
import PublicRoute from "./components/PublicRoute";

function App() {
  const { loading } = useSelector((state) => state.loader);

  return (
    <>
      <div>
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PublicRoute>
                {" "}
                <PublicBlogPage />{" "}
              </PublicRoute>
            }
          />
          <Route
            path="/blogs-by-user"
            element={
              <ProtectedRoute>
                {" "}
                <BlogByUser />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <PublicRoute>
                {" "}
                <BlogDetail />{" "}
              </PublicRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
