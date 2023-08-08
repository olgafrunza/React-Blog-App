import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import {
  Login,
  Register,
  Dashboard,
  BlogCardDetails,
  CreateBlog,
  UpdateBlog,
  UserProfile,
} from "../pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/" element={<PrivateRouter />}>
          <Route path="post/details/:id" element={<BlogCardDetails />} />
          <Route path="post/create" element={<CreateBlog />} />
          <Route path="post/update/:id" element={<UpdateBlog />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
