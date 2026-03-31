import React from "react";
import { Link } from "react-router-dom";
import "../Blog/BlogCard.css";

const BlogCard = ({ blog }) => {
    if (!blog) return null;

    const BASE_IMAGE_URL = "https://salarytopup.in/upload/";
    const cleanedFilename = blog.thumb_image_url.replace(/^DIRECT_DOC_URL/, "");
    const fullImageUrl = BASE_IMAGE_URL + cleanedFilename;

    return (
        <>
            <div className="card">
                <img
                    src={fullImageUrl || "https://via.placeholder.com/300x200"}
                    alt="Blog Image"
                    className="card-image"
                />
                <div className="card-content">
                    <h2 className="card-heading">{blog.title}</h2>
                    <p className="card-description">
                        {blog.short_description}
                    <Link to={`/blog/${blog.id}`} className="read-more-link">Read More</Link>
                    </p>
                    <p style={{marginTop:'20px'}}>{blog.created_date}</p>
                </div>
            </div>
        </>
    );
};

export default BlogCard;
