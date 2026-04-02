import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "../../css/Common.css";
import "./BlogAll.css";
import { Helmet } from "react-helmet";

const ADMIN_API = "http://localhost:5000/public";

const BlogAll = () => {
  const [blogList, setBlogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetch(`${ADMIN_API}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Status === 1) setBlogList(data.data || []);
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogList.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogList.length / postsPerPage);

  return (
    <>
      <Helmet>
        <title>Latest Blogs on Salary Loans & Financial Tips | Salary Top Up</title>
        <meta property="og:title" content="Latest Blogs on Salary Loans & Financial Tips | Salary Top Up" />
        <meta property="og:description" content="Stay updated with expert insights, tips, and guides on instant salary loans, personal finance, and money management. Explore the latest blog articles from Salary Top Up." />
        <meta name="description" content="Stay updated with expert insights, tips, and guides on instant salary loans, personal finance, and money management. Explore the latest blog articles from Salary Top Up." />
        <link rel="canonical" href="https://salarytopup.com/blog" />
      </Helmet>
      <section className="blog-wrapper">
        <h2 className="blog-page-heading">Our Blogs</h2>

        {currentPosts.length > 0 ? (
          <div className="blog-grid">
            {currentPosts.map((item) => (
              <BlogCard key={item._id} blog={item} />
            ))}
          </div>
        ) : (
          <div className="no-blogs-message">No blogs available at the moment.</div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default BlogAll;