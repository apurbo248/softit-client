import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Componets/Navbar";
import MyAccount from "./Componets/MyAccount";
import { createContext, useEffect, useState } from "react";
import Dashboard from "./Componets/Admin/Dashboard";
import Users from "./Componets/Admin/Users";
import Categories from "./Componets/Admin/Categories";
import Products from "./Componets/Admin/Products";
import UpdateCategory from "./Componets/Admin/UpdateCategory";
import UpdateProduct from "./Componets/Admin/UpdateProduct";
import UpdateUser from "./Componets/Admin/UpdateUser";
import ProtectedRoute from "./Componets/ProtectedRoute";
export const userContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const response = async () => {
    await fetch("https://stark-springs-97568.herokuapp.com/api/me", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  };
  console.log(user);
  useEffect(() => {
    response();
  }, []);

  return (
    <div>
      <userContext.Provider value={[user, setUser]}>
        <Routes>
          <Route path="/" element={<MyAccount />} />

          <Route
            path="/*"
            element={<ProtectedRoute isAuthenticated={user?.isAuthenticated} />}
          >
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/user_update/:id" element={<UpdateUser />} />
            <Route path="admin/categories" element={<Categories />} />
            <Route
              path="admin/category_update/:id"
              element={<UpdateCategory />}
            />
            <Route path="admin/products" element={<Products />} />
            <Route
              path="admin/product_update/:id"
              element={<UpdateProduct />}
            />

          
          </Route>
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
