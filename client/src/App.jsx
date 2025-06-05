import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogByUser from "./pages/BlogByUser";
import BlogDetail from "./pages/BlogDetail";
import PublicRoute from "./components/PublicRoute";
import PublicBlogPage from "./pages/PublicBlogPage";

function App() {

  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PublicRoute> <PublicBlogPage/> </PublicRoute>}/>
          <Route path="/blogs-by-user" element={<ProtectedRoute> <BlogByUser/> </ProtectedRoute>}/>
          <Route path="/blogs/:id" element={<PublicRoute> <BlogDetail/> </PublicRoute>}/>
        </Routes>
    </>
  );
}

export default App;
