import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toastNotify } from "../helper/Toastify";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();
const baseUrl = "https://cwbarry.pythonanywhere.com/";
// const baseUrl = 'https://20001.fullstack.clarusway.com/';

const BlogContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const { userInfo } = useContext(AuthContext);

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${baseUrl}blog/`);
      console.log(res.data.results);
      setBlogs(res.data.results);
    } catch (error) {
      console.log(error);
      toastNotify(error.message, "error");
    }
  };

  const getSingleBlog = async (id) => {
    try {
      console.log(userInfo);
      const res = await axios({
        method: "get",
        url: `${baseUrl}blog/${id}/`,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });

      console.log(res.data);
      setCurrentBlog(res.data);
    } catch (error) {
      console.log(error);
      toastNotify(error.message, "error");
    }
  };

  const addComment = async (id, data) => {
    try {
      const res = await axios({
        method: "post",
        url: `${baseUrl}blog/comment/`,
        data: { post: id, content: data },
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      toastNotify("Comment added successfully", "success");
      getSingleBlog(id);
    } catch (error) {
      console.log(error);
      toastNotify(error.message, "error");
    }
  };

  const addLike = async (slug, id) => {
    try {
      const res = await axios({
        method: "post",
        url: `${baseUrl}blog/like/${slug}/`,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      getSingleBlog(id);
    } catch (error) {
      console.log(error);
      toastNotify(error.message, "error");
    }
  };

  const deleteBlog = async (id, navigate) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${baseUrl}blog/${id}/`,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toastNotify(error.message, "error");
    }
  };

  const addBlog = async (data, navigate) => {
    try {
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("content", data.content);
      if (data.image) formdata.append("image", data.image, data.image.name);

      const res = await axios({
        method: "post",
        url: `${baseUrl}blog/`,
        data: formdata,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      toastNotify("Blog added successfully", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toastNotify(error.message, "error");
    }
  };

  const updateBlog = async (data, navigate, id) => {
    try {
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("content", data.content);
      if (data.image) formdata.append("image", data.image, data.image.name);

      const res = await axios({
        method: "put",
        url: `${baseUrl}blog/${id}/`,
        data: formdata,
        headers: {
          Authorization: `Token ${userInfo.key}`,
        },
      });
      toastNotify("Blog updated successfully", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toastNotify(error.message, "error");
    }
  };

  return (
    <BlogContext.Provider
      value={{
        getBlogs,
        blogs,
        getSingleBlog,
        currentBlog,
        addComment,
        addLike,
        deleteBlog,
        addBlog,
        updateBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
