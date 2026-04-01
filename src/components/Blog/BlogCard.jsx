import React from "react";
import { Link } from "react-router-dom";
import "../Blog/BlogCard.css";

const BlogCard = ({ blog }) => {
    if (!blog) return null;

    const BASE_IMAGE_URL = "https://salarytopup.in/upload/";
    const cleanedFilename = blog.thumb_image_url.replace(/^DIRECT_DOC_URL/, "");
    const fullImageUrl = BASE_IMAGE_URL + cleanedFilename;

    // Format date: "Mar 21, 2026"
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
                    src={fullImageUrl || "https://via.placeholder.com/400x220"}
                    alt={blog.title}
                    className="bc-img"
                />
            </div>
            <div className="bc-body">
                <div className="bc-meta">
                    <span className="bc-category">{category}</span>
                    <p className="bc-date">
                        <i className="far fa-calendar-alt"></i> {formatDate(blog.created_date)}
                    </p>
                </div>
                <h2 className="bc-title">{blog.title}</h2>
                <Link to={`/blog/${blog.id}`} className="bc-btn">
                    Read More <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
