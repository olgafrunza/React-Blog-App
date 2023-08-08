import React, { useContext, useEffect } from "react";

import { BlogCard, Layout } from "../components/";
import { BlogContext } from "../context/BlogContext";

const Dashboard = () => {
  const { getBlogs, blogs } = useContext(BlogContext);

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Layout>
      <p className="fs-2 text-center mt-5">Dashboard</p>
      <div className="container d-flex flex-wrap gap-3 justify-content-center ">
        {blogs.map((item) => (
          <BlogCard key={item.id} data={item} />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
