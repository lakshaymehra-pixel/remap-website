import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "../../css/Common.css";
import "./BlogAll.css";
import { Helmet } from "react-helmet";

const ADMIN_API = (process.env.REACT_APP_API_URL || "https://backend-production-bf30.up.railway.app") + "/public";

const BlogAll = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const postsPerPage = 9;

  useEffect(() => {
    fetch(`${ADMIN_API}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Status === 1) setBlogList(data.data || []);
        setLoading(false);
      })
      .catch((err) => { console.error("Error fetching blogs:", err); setLoading(false); });
  }, []);

  // Get unique categories from blogs
  const categories = ["All", ...Array.from(new Set(blogList.map(b => b.category).filter(Boolean)))];

  // Filter by category
  const filtered = activeCategory === "All" ? blogList : blogList.filter(b => b.category === activeCategory);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filtered.length / postsPerPage);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

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

        {/* Category Filter Tabs */}
        {!loading && categories.length > 1 && (
          <div className="blog-category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`blog-cat-tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => handleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="blog-grid">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bc-card blog-skeleton">
                <div className="blog-skel-img" />
                <div className="bc-body">
                  <div className="blog-skel-line" style={{ width: '40%', marginBottom: 10 }} />
                  <div className="blog-skel-line" style={{ width: '90%', marginBottom: 8 }} />
                  <div className="blog-skel-line" style={{ width: '70%', marginBottom: 20 }} />
                  <div className="blog-skel-line" style={{ width: '30%', height: 32, borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
        ) : currentPosts.length > 0 ? (
          <div className="blog-grid">
            {currentPosts.map((item) => (
              <BlogCard key={item._id} blog={item} />
            ))}
          </div>
        ) : (
          <div className="no-blogs-message">No blogs in this category.</div>
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
