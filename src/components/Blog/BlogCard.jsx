import { Link } from "react-router-dom";
import "../Blog/BlogCard.css";

const BlogCard = ({ blog }) => {
  if (!blog) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const category = blog.category || "Finance";

  return (
    <div className="bc-card">
      <div className="bc-img-wrap">
        <img
          src={blog.thumb_image_url || "https://via.placeholder.com/400x220"}
          alt={blog.title}
          className="bc-img"
        />
      </div>
      <div className="bc-body">
        <div className="bc-meta">
          <span className="bc-category">{category}</span>
          <p className="bc-date">
            <i className="far fa-calendar-alt"></i> {formatDate(blog.createdAt)}
          </p>
        </div>
        <h2 className="bc-title">{blog.title}</h2>
        <Link to={`/blog/${blog.slug}`} className="bc-btn">
          Read More <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;